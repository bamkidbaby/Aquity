import {
  ArrowUpRight,
  BellDot,
  Building2,
  CheckCheck,
  CircleDollarSign,
  Clock3,
  Download,
  FileLock2,
  FolderKanban,
  LayoutGrid,
  LayoutPanelTop,
  LifeBuoy,
  Pin,
  PinOff,
  ShieldCheck,
  Signature,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  Users,
  Workflow,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedText from "../components/AnimatedText";
import PageFrame from "../components/PageFrame";
import Reveal from "../components/Reveal";
import { getDashboardOverview } from "../lib/api";
import { clearSession, getStoredUser } from "../lib/auth";

const projectFilters = ["All", "Active", "In Review", "Planning", "Delivered"];
const layoutPresets = [
  { id: "executive", label: "Executive layout" },
  { id: "operational", label: "Operational layout" },
];

function getProjectStatus(project) {
  return project?.status ?? "Active";
}

function getProgressValue(project) {
  if (typeof project?.progress === "number") {
    return Math.max(0, Math.min(100, project.progress));
  }

  const matched = String(project?.progress ?? "").match(/\d+/);
  return matched ? Math.max(0, Math.min(100, Number(matched[0]))) : 0;
}

function exportRowsAsCsv(filename, rows) {
  if (!rows.length) {
    return;
  }

  const headers = Object.keys(rows[0]);
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [headers.join(",")]
    .concat(rows.map((row) => headers.map((header) => escape(row[header])).join(",")))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function SectionCard({ eyebrow, title, description, action, children, className = "" }) {
  return (
    <Reveal className={`border border-white/10 bg-black/45 p-6 backdrop-blur-md ${className}`.trim()}>
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <AnimatedText
            as="p"
            className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-white/25"
            text={eyebrow}
          />
          <AnimatedText
            as="h2"
            className="text-2xl font-semibold tracking-tight"
            text={title}
          />
          {description ? (
            <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-white/40">
              {description}
            </p>
          ) : null}
        </div>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [activeViewId, setActiveViewId] = useState("admin");
  const [entityId, setEntityId] = useState("");
  const [layoutPreset, setLayoutPreset] = useState("executive");
  const [pinnedWidgetIds, setPinnedWidgetIds] = useState([]);
  const [reportSegment, setReportSegment] = useState("All Projects");
  const [reportPeriod, setReportPeriod] = useState("Quarter");
  const [selectedReportId, setSelectedReportId] = useState("delivery_velocity");

  useEffect(() => {
    let ignore = false;

    async function loadOverview() {
      try {
        const payload = await getDashboardOverview();
        if (!ignore) {
          setOverview(payload);
          setActiveViewId(payload.availableViews?.[0]?.id ?? "admin");
          setEntityId(payload.entities?.[0]?.id ?? "");
          setPinnedWidgetIds(payload.widgetCatalog?.slice(0, 2).map((item) => item.id) ?? []);
        }
      } catch (requestError) {
        if (!ignore) {
          if (requestError.message.includes("Authentication") || requestError.message.includes("Invalid")) {
            clearSession();
            navigate("/login", { replace: true });
            return;
          }
          setError(requestError.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadOverview();

    return () => {
      ignore = true;
    };
  }, [navigate]);

  const user = overview?.user ?? getStoredUser();
  const projects = overview?.projects ?? [];
  const activity = overview?.activity ?? [];
  const stats = overview?.stats;
  const availableViews = overview?.availableViews ?? [];
  const entities = overview?.entities ?? [];
  const widgetCatalog = overview?.widgetCatalog ?? [];
  const timeline = overview?.timeline ?? [];
  const reports = overview?.reports;
  const alerts = overview?.alerts ?? [];
  const approvals = overview?.approvals ?? [];
  const support = overview?.support;
  const documents = overview?.documents ?? [];
  const usage = overview?.usage;
  const changelog = overview?.changelog ?? [];

  const activeView =
    availableViews.find((view) => view.id === activeViewId) ??
    availableViews[0] ??
    null;
  const activeEntity =
    entities.find((entity) => entity.id === entityId) ??
    entities[0] ??
    null;

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => getProjectStatus(project) === activeFilter);
  }, [activeFilter, projects]);

  useEffect(() => {
    if (!filteredProjects.length) {
      setSelectedProjectId(null);
      return;
    }

    if (!selectedProjectId || !filteredProjects.some((project) => project.id === selectedProjectId)) {
      setSelectedProjectId(filteredProjects[0].id);
    }
  }, [filteredProjects, selectedProjectId]);

  const selectedProject =
    filteredProjects.find((project) => project.id === selectedProjectId) ??
    filteredProjects[0] ??
    null;
  const selectedProgress = getProgressValue(selectedProject);

  const visibleWidgets = useMemo(() => {
    const allowed = widgetCatalog.filter(
      (widget) => !activeView || widget.roleIds.includes(activeView.id),
    );
    const ordered = [...allowed].sort((left, right) => {
      const leftPinned = pinnedWidgetIds.includes(left.id);
      const rightPinned = pinnedWidgetIds.includes(right.id);

      if (leftPinned === rightPinned) {
        return 0;
      }

      return leftPinned ? -1 : 1;
    });

    return layoutPreset === "operational" ? ordered.slice(0, 4) : ordered;
  }, [activeView, layoutPreset, pinnedWidgetIds, widgetCatalog]);

  const selectedReport =
    reports?.metrics?.find((metric) => metric.id === selectedReportId) ??
    reports?.metrics?.[0] ??
    null;

  const focusMoments = [
    {
      icon: ShieldCheck,
      label: "Approvals on track",
      value: `${stats?.approvalsPending ?? 0} waiting`,
    },
    {
      icon: BellDot,
      label: "Updates to review",
      value: `${stats?.unreadUpdates ?? 0} new notes`,
    },
    {
      icon: FolderKanban,
      label: "Live engagements",
      value: `${stats?.activeProjects ?? filteredProjects.length} active`,
    },
  ];

  const nextActions = selectedProject
    ? [
        `Review the latest notes for ${selectedProject.name}.`,
        `Confirm the next milestone before progress moves beyond ${selectedProgress}%.`,
        "Keep approvals, tickets, and reports anchored to one workspace instead of parallel threads.",
      ]
    : [
        "Sign in to unlock project actions.",
        "Use this workspace to manage feedback and next steps.",
        "Keep every decision attached to the work itself.",
      ];

  if (isLoading) {
    return (
      <PageFrame glowClassName="left-1/2 top-0 h-[460px] w-[860px] -translate-x-1/2 bg-sky-300/8">
        <section className="pb-16 pt-40">
          <Reveal className="border border-white/10 bg-black/45 p-8 font-mono text-sm text-white/45 backdrop-blur-md">
            Loading workspace experience...
          </Reveal>
        </section>
      </PageFrame>
    );
  }

  if (error) {
    return (
      <PageFrame glowClassName="left-1/2 top-0 h-[460px] w-[860px] -translate-x-1/2 bg-sky-300/8">
        <section className="pb-16 pt-40">
          <Reveal className="grid gap-4 border border-white/10 bg-black/45 p-8 backdrop-blur-md">
            <p className="font-mono text-sm text-red-300">{error}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/login"
                className="border border-white/15 px-4 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                Sign In
              </Link>
              <button
                type="button"
                onClick={() => {
                  clearSession();
                  window.location.reload();
                }}
                className="border border-white/15 px-4 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                Reset Session
              </button>
            </div>
          </Reveal>
        </section>
      </PageFrame>
    );
  }

  return (
    <PageFrame glowClassName="left-1/2 top-0 h-[460px] w-[860px] -translate-x-1/2 bg-sky-300/8">
      <section className="pb-12 pt-36 md:pt-44">
        <Reveal className="flex flex-col gap-8 border-b border-white/10 pb-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <AnimatedText
                as="p"
                className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-white/30"
                text="Client Workspace"
              />
              <AnimatedText
                as="h1"
                className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl"
                lines={["A role-aware command center", "for projects, approvals, and value."]}
              />
            </div>
            <AnimatedText
              as="p"
              delay={120}
              className="max-w-md font-mono text-sm leading-relaxed text-white/40"
              lines={[
                user?.fullName
                  ? `Welcome, ${user.fullName}. This dashboard now adapts by role, entity, and operating priorities so every stakeholder sees the right level of detail.`
                  : "This workspace is structured for executive clarity, operational follow-through, and audit-friendly client collaboration.",
              ]}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_0.9fr]">
            <div className="border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/25">
                Role Lens
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {availableViews.map((view) => (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setActiveViewId(view.id)}
                    className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition duration-300 ${
                      activeView?.id === view.id
                        ? "border-white bg-white text-black"
                        : "border-white/12 text-white/55 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
              <p className="mt-4 font-mono text-sm leading-relaxed text-white/42">
                {activeView?.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(activeView?.nav ?? []).map((item) => (
                  <span
                    key={item}
                    className="border border-white/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 text-white/60">
                <Building2 size={16} />
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/25">
                  Active Entity
                </p>
              </div>
              <div className="mt-4 grid gap-2">
                {entities.map((entity) => {
                  const isActive = activeEntity?.id === entity.id;

                  return (
                    <button
                      key={entity.id}
                      type="button"
                      onClick={() => setEntityId(entity.id)}
                      className={`flex items-center justify-between gap-3 border px-4 py-3 text-left transition duration-300 ${
                        isActive
                          ? "border-white bg-white text-black"
                          : "border-white/12 text-white/70 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium">{entity.name}</p>
                        <p className={`mt-1 font-mono text-[11px] uppercase tracking-[0.18em] ${isActive ? "text-black/60" : "text-white/28"}`}>
                          {entity.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{entity.projects} projects</p>
                        <p className={`mt-1 font-mono text-[11px] uppercase tracking-[0.18em] ${isActive ? "text-black/60" : "text-white/28"}`}>
                          {entity.health}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 text-white/60">
                <LayoutGrid size={16} />
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/25">
                  Layout Controls
                </p>
              </div>
              <div className="mt-4 grid gap-2">
                {layoutPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setLayoutPreset(preset.id)}
                    className={`border px-4 py-3 text-left transition duration-300 ${
                      layoutPreset === preset.id
                        ? "border-white bg-white text-black"
                        : "border-white/12 text-white/70 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <p className="text-sm font-medium">{preset.label}</p>
                    <p className={`mt-1 font-mono text-[11px] uppercase tracking-[0.18em] ${layoutPreset === preset.id ? "text-black/60" : "text-white/28"}`}>
                      Saved dashboard view
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="grid gap-10 pb-24">
        <SectionCard
          eyebrow="Adaptive KPIs"
          title="Pinned metrics and layout presets"
          description="Clients can surface the KPIs that matter to their role, keep critical widgets pinned, and switch saved layouts without support intervention."
          action={
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/25">
                {layoutPreset === "executive" ? "Full deck" : "Operational shortlist"}
              </span>
            </div>
          }
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleWidgets.map((widget, index) => {
              const isPinned = pinnedWidgetIds.includes(widget.id);

              return (
                <div
                  key={widget.id}
                  className="border border-white/10 bg-white/[0.03] p-5"
                  data-aos="fade-up"
                  data-aos-delay={index * 60}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                        {widget.label}
                      </p>
                      <p className="mt-4 text-3xl font-semibold text-white">{widget.value}</p>
                      <p className="mt-2 font-mono text-sm text-white/40">{widget.change}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setPinnedWidgetIds((current) =>
                          current.includes(widget.id)
                            ? current.filter((item) => item !== widget.id)
                            : [...current, widget.id],
                        )
                      }
                      className="text-white/35 transition duration-300 hover:text-white"
                      aria-label={isPinned ? `Unpin ${widget.label}` : `Pin ${widget.label}`}
                    >
                      {isPinned ? <PinOff size={16} /> : <Pin size={16} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          <SectionCard
            eyebrow="Milestones"
            title="Timeline, blockers, and change awareness"
            description="A project timeline with current phase, upcoming checkpoints, blockers, and a concise summary of what changed since the last session."
          >
            <div className="grid gap-4">
              {timeline.map((item, index) => (
                <div
                  key={item.id}
                  className="grid gap-4 border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[0.8fr_1.2fr_0.8fr]"
                  data-aos="fade-up"
                  data-aos-delay={index * 60}
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                      {item.phase}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">{item.milestone}</p>
                    <p className="mt-2 font-mono text-sm text-white/40">{item.status}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                        Completion
                      </p>
                      <p className="font-mono text-[11px] text-white/45">{item.percentComplete}%</p>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden bg-white/8">
                      <div className="h-full bg-white transition-[width] duration-500" style={{ width: `${item.percentComplete}%` }} />
                    </div>
                    <p className="mt-3 font-mono text-sm text-white/42">{item.changed}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                      Blocker / next date
                    </p>
                    <p className="mt-3 text-sm text-white/75">{item.dueLabel}</p>
                    <p className="mt-2 font-mono text-sm leading-relaxed text-white/40">
                      {item.blocker}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Since Last Login"
            title="Focus this week"
            description="High-signal summaries for executives and operators, plus short recommendations for immediate follow-through."
          >
            <div className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {focusMoments.map(({ icon: Icon, label, value }, index) => (
                  <div
                    key={label}
                    className="border border-white/10 bg-white/[0.03] px-4 py-4"
                    data-aos="fade-up"
                    data-aos-delay={index * 60}
                  >
                    <Icon size={16} className="text-white/60" />
                    <p className="mt-4 text-lg font-semibold text-white">{value}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 border border-white/10 bg-white/[0.03] p-5">
                {changelog.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 border-b border-white/6 pb-3 last:border-b-0 last:pb-0"
                    data-aos="fade-up"
                    data-aos-delay={index * 60}
                  >
                    <Sparkles size={15} className="mt-0.5 shrink-0 text-white/48" />
                    <p className="font-mono text-sm leading-relaxed text-white/40">{item}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 border border-white/10 bg-white/[0.03] p-5">
                {nextActions.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                    data-aos="fade-up"
                    data-aos-delay={index * 60}
                  >
                    <CheckCheck size={15} className="mt-0.5 shrink-0 text-white/48" />
                    <p className="font-mono text-sm leading-relaxed text-white/42">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        <SectionCard
          eyebrow="Project Board"
          title="Entity-aware delivery board"
          description="Switch views by delivery status, then select a project to review current progress, recommended pace, and the most relevant next checkpoint."
          action={
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/25">
              {activeEntity?.name ?? "Consolidated"} selected
            </span>
          }
        >
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-5">
            {projectFilters.map((filter) => {
              const isActive = filter === activeFilter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition duration-300 ${
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-white/12 text-white/55 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-px border border-white/10 bg-white/10">
              {filteredProjects.length ? (
                filteredProjects.map((project, index) => {
                  const progressValue = getProgressValue(project);
                  const isSelected = project.id === selectedProject?.id;

                  return (
                    <button
                      key={project.id ?? project.name}
                      type="button"
                      onClick={() => setSelectedProjectId(project.id)}
                      className={`grid gap-4 px-6 py-6 text-left transition duration-300 md:grid-cols-[1.2fr_0.45fr_0.35fr_0.35fr] ${
                        isSelected
                          ? "bg-white text-black"
                          : "bg-black/45 text-white hover:bg-black/55"
                      }`}
                      data-aos="fade-up"
                      data-aos-delay={index * 60}
                    >
                      <div>
                        <p className="text-xl font-semibold tracking-tight">{project.name}</p>
                        <p className={`mt-2 font-mono text-sm leading-relaxed ${isSelected ? "text-black/70" : "text-white/38"}`}>
                          {project.update}
                        </p>
                      </div>
                      <div>
                        <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${isSelected ? "text-black/45" : "text-white/25"}`}>
                          Status
                        </p>
                        <p className="mt-2 text-sm">{getProjectStatus(project)}</p>
                      </div>
                      <div>
                        <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${isSelected ? "text-black/45" : "text-white/25"}`}>
                          Progress
                        </p>
                        <p className="mt-2 text-sm">{progressValue}%</p>
                      </div>
                      <div>
                        <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${isSelected ? "text-black/45" : "text-white/25"}`}>
                          Delta
                        </p>
                        <p className="mt-2 text-sm">{project.delta ?? "+0%"}</p>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="bg-black/45 px-6 py-8">
                  <p className="font-mono text-sm text-white/42">
                    No projects match this view yet. Try another filter or start a new request.
                  </p>
                </div>
              )}
            </div>

            <div className="border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <AnimatedText
                    as="p"
                    className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-white/25"
                    text="Project Focus"
                  />
                  <AnimatedText
                    as="h3"
                    className="text-2xl font-semibold tracking-tight"
                    text={selectedProject?.name ?? "No project selected"}
                  />
                </div>
                <LayoutPanelTop size={18} className="text-white/35" />
              </div>

              <p className="mt-4 font-mono text-sm leading-relaxed text-white/40">
                {selectedProject?.update ??
                  "Choose a project on the left to see the current momentum, next action, and handoff guidance."}
              </p>

              <div className="mt-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/25">
                    Delivery Confidence
                  </span>
                  <span className="font-mono text-xs text-white/50">{selectedProgress}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden bg-white/8">
                  <div className="h-full bg-white transition-[width] duration-500" style={{ width: `${selectedProgress}%` }} />
                </div>
              </div>

              <div className="mt-6 grid gap-3 border-y border-white/10 py-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/25">
                    Current status
                  </span>
                  <span className="text-sm text-white/78">
                    {selectedProject ? getProjectStatus(selectedProject) : "Awaiting access"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/25">
                    Recommended pace
                  </span>
                  <span className="text-sm text-white/78">
                    {selectedProgress >= 80 ? "Final review" : selectedProgress >= 40 ? "Active delivery" : "Strategic setup"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/25">
                    Next checkpoint
                  </span>
                  <span className="text-sm text-white/78">
                    {selectedProject?.nextMilestone ?? "Client alignment"}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white px-4 py-3 font-mono text-xs uppercase tracking-widest text-black transition duration-300 hover:bg-white/90"
                >
                  Start Request
                  <ArrowUpRight size={14} />
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 px-4 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
                >
                  Review Insights
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-10 xl:grid-cols-[1fr_0.9fr]">
          <SectionCard
            eyebrow="Interactive Reports"
            title="Drill into filtered performance views"
            description="Click through KPI narratives by segment or time period, then export the exact view being discussed."
            action={
              <button
                type="button"
                onClick={() =>
                  exportRowsAsCsv("aquity-report-view.csv", [
                    {
                      segment: reportSegment,
                      period: reportPeriod,
                      metric: selectedReport?.label ?? "Report",
                      value: selectedReport?.value ?? "",
                      details: (selectedReport?.drilldown ?? []).join(" | "),
                    },
                  ])
                }
                className="inline-flex items-center gap-2 border border-white/15 px-4 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                Export View
                <Download size={14} />
              </button>
            }
          >
            <div className="grid gap-4 md:grid-cols-[0.42fr_0.58fr]">
              <div className="grid gap-4">
                <div className="border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                    Segment
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(reports?.segments ?? []).map((segment) => (
                      <button
                        key={segment}
                        type="button"
                        onClick={() => setReportSegment(segment)}
                        className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition duration-300 ${
                          reportSegment === segment
                            ? "border-white bg-white text-black"
                            : "border-white/12 text-white/55 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {segment}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                    Time Period
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(reports?.periods ?? []).map((period) => (
                      <button
                        key={period}
                        type="button"
                        onClick={() => setReportPeriod(period)}
                        className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition duration-300 ${
                          reportPeriod === period
                            ? "border-white bg-white text-black"
                            : "border-white/12 text-white/55 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-px border border-white/10 bg-white/10">
                  {(reports?.metrics ?? []).map((metric, index) => {
                    const isSelected = selectedReport?.id === metric.id;

                    return (
                      <button
                        key={metric.id}
                        type="button"
                        onClick={() => setSelectedReportId(metric.id)}
                        className={`flex items-center justify-between gap-4 px-5 py-5 text-left transition duration-300 ${
                          isSelected
                            ? "bg-white text-black"
                            : "bg-black/45 text-white hover:bg-black/55"
                        }`}
                        data-aos="fade-up"
                        data-aos-delay={index * 60}
                      >
                        <div>
                          <p className="text-lg font-semibold">{metric.label}</p>
                          <p className={`mt-2 font-mono text-sm ${isSelected ? "text-black/70" : "text-white/38"}`}>
                            {metric.value}
                          </p>
                        </div>
                        <TrendingUp size={16} className={isSelected ? "text-black/60" : "text-white/35"} />
                      </button>
                    );
                  })}
                </div>

                <div className="border border-white/10 bg-white/[0.03] p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                    Drill-down
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">{selectedReport?.label}</p>
                  <p className="mt-2 font-mono text-sm text-white/40">
                    {reportSegment} · {reportPeriod}
                  </p>
                  <div className="mt-5 grid gap-3">
                    {(selectedReport?.drilldown ?? []).map((item) => (
                      <div key={item} className="flex items-start gap-3 border-b border-white/6 pb-3 last:border-b-0 last:pb-0">
                        <Workflow size={15} className="mt-0.5 shrink-0 text-white/45" />
                        <p className="font-mono text-sm leading-relaxed text-white/40">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Alerts"
            title="Anomalies, thresholds, and guided next steps"
            description="Elevated monitoring for overdue work, budget movement, and service health, with clear recommendations instead of vague warnings."
          >
            <div className="grid gap-4">
              {alerts.map((alert, index) => (
                <div
                  key={alert.id}
                  className="border border-white/10 bg-white/[0.03] p-5"
                  data-aos="fade-up"
                  data-aos-delay={index * 60}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <TriangleAlert size={16} className="text-white/65" />
                      <p className="text-lg font-semibold text-white">{alert.title}</p>
                    </div>
                    <span className="border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                      {alert.severity}
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-sm leading-relaxed text-white/40">{alert.body}</p>
                  <div className="mt-4 border-l border-white/10 pl-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                      Recommended next step
                    </p>
                    <p className="mt-2 text-sm text-white/75">{alert.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="grid gap-10 xl:grid-cols-[1fr_1fr]">
          <SectionCard
            eyebrow="Approvals"
            title="Audit-ready sign-off checkpoints"
            description="Built-in approvals for deliverables, invoices, and change requests with status, versioning, comments, and a clear next due date."
          >
            <div className="grid gap-4">
              {approvals.map((approval, index) => (
                <div
                  key={approval.id}
                  className="grid gap-4 border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[0.9fr_1fr_0.6fr]"
                  data-aos="fade-up"
                  data-aos-delay={index * 60}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <Signature size={16} className="text-white/55" />
                      <p className="text-lg font-semibold text-white">{approval.type}</p>
                    </div>
                    <p className="mt-3 font-mono text-sm text-white/40">{approval.item}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                      Version / status
                    </p>
                    <p className="mt-2 text-sm text-white/75">{approval.version}</p>
                    <p className="mt-2 font-mono text-sm text-white/40">{approval.status}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                      Deadline / comments
                    </p>
                    <p className="mt-2 text-sm text-white/75">{approval.dueLabel}</p>
                    <p className="mt-2 font-mono text-sm text-white/40">{approval.comments} comments</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Support Center"
            title="Tickets, ownership, and SLA visibility"
            description="Embedded support requests with category, priority, owner, status, SLA timer, and a small feed of recent resolutions."
          >
            <div className="grid gap-4">
              <div className="grid gap-4">
                {(support?.tickets ?? []).map((ticket, index) => (
                  <div
                    key={ticket.id}
                    className="grid gap-4 border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[1fr_0.7fr_0.6fr]"
                    data-aos="fade-up"
                    data-aos-delay={index * 60}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <LifeBuoy size={16} className="text-white/55" />
                        <p className="text-lg font-semibold text-white">{ticket.title}</p>
                      </div>
                      <p className="mt-3 font-mono text-sm text-white/40">
                        {ticket.category} · {ticket.priority} priority
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                        Owner / status
                      </p>
                      <p className="mt-2 text-sm text-white/75">{ticket.owner}</p>
                      <p className="mt-2 font-mono text-sm text-white/40">{ticket.status}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                        SLA timer
                      </p>
                      <p className="mt-2 text-sm text-white/75">{ticket.sla}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-white/10 bg-white/[0.03] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                  Recent resolutions
                </p>
                <div className="mt-4 grid gap-3">
                  {(support?.recentResolutions ?? []).map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Clock3 size={15} className="mt-0.5 shrink-0 text-white/45" />
                      <p className="font-mono text-sm leading-relaxed text-white/40">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="grid gap-10 xl:grid-cols-[1fr_1fr]">
          <SectionCard
            eyebrow="Document Hub"
            title="Secure files, expiry controls, and access logs"
            description="A central repository for contracts, reports, and finance artifacts, with role-aware permissions and download visibility."
          >
            <div className="grid gap-4">
              {documents.map((document, index) => (
                <div
                  key={document.id}
                  className="grid gap-4 border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[1fr_0.75fr_0.55fr_0.35fr]"
                  data-aos="fade-up"
                  data-aos-delay={index * 60}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <FileLock2 size={16} className="text-white/55" />
                      <p className="text-lg font-semibold text-white">{document.name}</p>
                    </div>
                    <p className="mt-3 font-mono text-sm text-white/40">{document.category}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                      Permissions
                    </p>
                    <p className="mt-2 text-sm text-white/75">{document.permission}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                      Expires
                    </p>
                    <p className="mt-2 text-sm text-white/75">{document.expires}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                      Logs
                    </p>
                    <p className="mt-2 text-sm text-white/75">{document.downloads}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Value Tracking"
            title="Adoption, ROI, and next-best actions"
            description="Usage analytics that help clients see what they are getting from the engagement and what to do next to increase value."
          >
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-white/55" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                      Adoption Score
                    </p>
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white">{usage?.adoptionScore ?? "--"}</p>
                </div>
                <div className="border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center gap-3">
                    <CircleDollarSign size={16} className="text-white/55" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                      ROI
                    </p>
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white">{usage?.roiLabel ?? "--"}</p>
                </div>
              </div>

              <div className="grid gap-3 border border-white/10 bg-white/[0.03] p-5">
                {(usage?.trend ?? []).map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 border-b border-white/6 pb-3 last:border-b-0 last:pb-0">
                    <p className="font-mono text-sm text-white/42">{item.label}</p>
                    <p className="text-sm text-white/75">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 border border-white/10 bg-white/[0.03] p-5">
                {(usage?.nextBestActions ?? []).map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-white/45" />
                    <p className="font-mono text-sm leading-relaxed text-white/40">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="grid gap-10 xl:grid-cols-[0.7fr_0.3fr]">
          <SectionCard
            eyebrow="Recent Activity"
            title="Live feed of delivery movement"
            description="A concise operational log for stakeholders who need to know what just changed without reading every internal thread."
          >
            <div className="grid gap-4">
              {(activity.length ? activity : ["Sign in to load live workspace activity."]).map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-3 border-b border-white/6 pb-3 last:border-b-0 last:pb-0"
                  data-aos="fade-up"
                  data-aos-delay={index * 60}
                >
                  <Clock3 size={15} className="mt-0.5 shrink-0 text-white/40" />
                  <p className="font-mono text-sm leading-relaxed text-white/38">{item}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Session"
            title="Authorized workspace access"
            description="Dashboard access remains limited to authenticated users and tracked client sessions."
          >
            <div className="grid gap-3">
              <div className="border border-white/10 bg-white/[0.03] px-4 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/28">
                  Authorized Workspace
                </p>
                <p className="mt-2 text-sm text-white/72">
                  {user?.email ?? "Authenticated access required"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  clearSession();
                  window.location.href = "/login";
                }}
                className="border border-white/15 px-4 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                Log Out
              </button>
            </div>
          </SectionCard>
        </div>
      </section>
    </PageFrame>
  );
}
