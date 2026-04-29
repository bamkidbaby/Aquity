function safeProgress(project) {
  if (typeof project?.progress === "number") {
    return Math.max(0, Math.min(100, project.progress));
  }

  const matched = String(project?.progress ?? "").match(/\d+/);
  return matched ? Math.max(0, Math.min(100, Number(matched[0]))) : 0;
}

function safeStatus(project, fallback = "Active") {
  return project?.status ?? fallback;
}

function phaseFromProgress(progress) {
  if (progress >= 90) {
    return "Final Review";
  }

  if (progress >= 65) {
    return "Build";
  }

  if (progress >= 40) {
    return "Design";
  }

  return "Strategy";
}

export function buildDashboardExperience({ user, stats, projects, activity }) {
  const normalizedProjects = projects.map((project, index) => {
    const progress = safeProgress(project);
    const phase = phaseFromProgress(progress);

    return {
      ...project,
      progress,
      phase,
      owner: ["Aquity Studio", "Product Systems", "Client Success"][index % 3],
      region: ["Global", "West Africa", "EMEA"][index % 3],
      nextMilestone:
        progress >= 85
          ? "Executive sign-off"
          : progress >= 60
            ? "Prototype review"
            : progress >= 35
              ? "Scope alignment"
              : "Discovery workshop",
      blocker:
        progress >= 85
          ? "Awaiting final legal review"
          : progress >= 60
            ? "Feedback window closes Friday"
            : progress >= 35
              ? "Dependencies being confirmed"
              : "Stakeholder availability",
      delta:
        index === 0
          ? "+6%"
          : index === 1
            ? "-2%"
            : "+4%",
      budgetVariance:
        index === 0 ? "+1.8%" : index === 1 ? "-0.6%" : "+3.4%",
    };
  });

  const primaryProject = normalizedProjects[0] ?? null;
  const unreadUpdates = stats?.unreadUpdates ?? 0;
  const approvalsPending = stats?.approvalsPending ?? 0;
  const activeProjects = stats?.activeProjects ?? normalizedProjects.length;

  return {
    availableViews: [
      {
        id: "admin",
        label: "Admin",
        summary: "Portfolio health, approvals, and operational visibility.",
        nav: ["Overview", "Approvals", "Documents", "Support"],
      },
      {
        id: "finance",
        label: "Finance",
        summary: "Budget variance, invoice checkpoints, and value tracking.",
        nav: ["Financials", "Approvals", "Reports", "Documents"],
      },
      {
        id: "ops",
        label: "Ops",
        summary: "Milestones, blockers, SLA commitments, and delivery velocity.",
        nav: ["Milestones", "Tickets", "Alerts", "Entities"],
      },
      {
        id: "viewer",
        label: "Viewer",
        summary: "Clear updates, key documents, and simple project visibility.",
        nav: ["Overview", "Updates", "Documents", "Usage"],
      },
    ],
    entities: [
      {
        id: "entity_global",
        name: user?.company ?? "Aquity World Group",
        type: "Consolidated",
        projects: activeProjects,
        health: "Healthy",
      },
      {
        id: "entity_lagos",
        name: "Lagos Operation",
        type: "Location",
        projects: Math.max(1, activeProjects - 1),
        health: "Attention",
      },
      {
        id: "entity_abuja",
        name: "Abuja Expansion",
        type: "Program",
        projects: Math.max(1, activeProjects - 2),
        health: "Stable",
      },
    ],
    widgetCatalog: [
      {
        id: "delivery_confidence",
        label: "Delivery Confidence",
        value: `${primaryProject ? primaryProject.progress : 82}%`,
        change: primaryProject?.delta ?? "+4%",
        roleIds: ["admin", "ops", "viewer"],
      },
      {
        id: "budget_variance",
        label: "Budget Variance",
        value: primaryProject?.budgetVariance ?? "+1.2%",
        change: "Within threshold",
        roleIds: ["admin", "finance"],
      },
      {
        id: "approvals_due",
        label: "Approvals Due",
        value: `${approvalsPending}`,
        change: "2 due in 48h",
        roleIds: ["admin", "finance", "ops"],
      },
      {
        id: "support_sla",
        label: "SLA Health",
        value: "97.4%",
        change: "Up 1.2%",
        roleIds: ["admin", "ops", "viewer"],
      },
      {
        id: "value_realized",
        label: "Value Realized",
        value: "$184k",
        change: "Q2 projection",
        roleIds: ["admin", "finance"],
      },
      {
        id: "adoption_score",
        label: "Adoption Score",
        value: "81",
        change: `${unreadUpdates} active touchpoints`,
        roleIds: ["admin", "viewer", "ops"],
      },
    ],
    changelog: [
      "Two milestone dates moved forward after the latest review cycle.",
      "One approval bundle is now waiting for finance sign-off.",
      "Support response times improved since your last session.",
    ],
    timeline: normalizedProjects.map((project, index) => ({
      id: `timeline_${project.id ?? index}`,
      phase: project.phase,
      milestone: project.nextMilestone,
      status: safeStatus(project, "Active"),
      percentComplete: project.progress,
      dueLabel: index === 0 ? "May 02" : index === 1 ? "May 08" : "May 14",
      blocker: project.blocker,
      changed: index === 0 ? "Scope approved" : index === 1 ? "Prototype updated" : "Dependencies cleared",
    })),
    reports: {
      segments: ["All Projects", "By Region", "By Team", "By Time Period"],
      periods: ["30 Days", "Quarter", "Year to Date"],
      metrics: [
        {
          id: "delivery_velocity",
          label: "Delivery Velocity",
          value: "18 milestones",
          drilldown: ["Global: 8", "West Africa: 6", "EMEA: 4"],
        },
        {
          id: "budget_health",
          label: "Budget Health",
          value: "2.1% variance",
          drilldown: ["Strategy: +0.4%", "Delivery: +1.2%", "Change requests: +0.5%"],
        },
        {
          id: "stakeholder_response",
          label: "Stakeholder Response",
          value: "11h avg",
          drilldown: ["Exec team: 8h", "Ops: 12h", "Finance: 14h"],
        },
      ],
    },
    alerts: [
      {
        id: "alert_approval",
        severity: "High",
        title: "Approval window approaching",
        body: "Design approval for the primary workstream closes within 36 hours.",
        action: "Review latest deliverable and confirm sign-off today.",
      },
      {
        id: "alert_budget",
        severity: "Medium",
        title: "Budget variance detected",
        body: "Implementation hours increased after scope changes in one active program.",
        action: "Review the change request bundle before the next invoice cut.",
      },
      {
        id: "alert_sla",
        severity: "Low",
        title: "Support SLA recovered",
        body: "Average first response times are back within target after last week’s spike.",
        action: "No immediate action required; keep monitoring weekly trend.",
      },
    ],
    approvals: [
      {
        id: "approval_design",
        type: "Design Review",
        item: primaryProject?.name ?? "Homepage Direction",
        version: "v2.4",
        status: "Pending signature",
        dueLabel: "Due May 01",
        comments: 12,
      },
      {
        id: "approval_invoice",
        type: "Invoice Approval",
        item: "April Retainer",
        version: "INV-0426",
        status: "Awaiting finance",
        dueLabel: "Due May 03",
        comments: 4,
      },
      {
        id: "approval_change",
        type: "Change Request",
        item: "Reporting Expansion",
        version: "CR-018",
        status: "Ready for review",
        dueLabel: "Due May 05",
        comments: 7,
      },
    ],
    support: {
      tickets: [
        {
          id: "ticket_041",
          title: "Need updated stakeholder invite copy",
          priority: "High",
          category: "Content",
          owner: "Client Success",
          status: "In Progress",
          sla: "1h 12m left",
        },
        {
          id: "ticket_037",
          title: "Report export format change",
          priority: "Medium",
          category: "Reporting",
          owner: "Operations Desk",
          status: "Queued",
          sla: "4h 30m left",
        },
      ],
      recentResolutions: [
        "Resolved invoice access issue for finance stakeholders.",
        "Closed document permissions request for regional leads.",
      ],
    },
    documents: [
      {
        id: "doc_master_service",
        name: "Master Service Agreement",
        category: "Contract",
        permission: "Admin only",
        expires: "Never",
        downloads: 5,
      },
      {
        id: "doc_q2_report",
        name: "Q2 Performance Report",
        category: "Report",
        permission: "Shared with leadership",
        expires: "May 30",
        downloads: 14,
      },
      {
        id: "doc_invoice_pack",
        name: "Invoice & Statement Pack",
        category: "Finance",
        permission: "Finance only",
        expires: "June 10",
        downloads: 3,
      },
    ],
    usage: {
      adoptionScore: 81,
      roiLabel: "$184k tracked value",
      trend: [
        { label: "Portal adoption", value: "74% weekly active stakeholders" },
        { label: "Decision velocity", value: "32% faster approval turnaround" },
        { label: "Time saved", value: "11.4h less coordination overhead / week" },
      ],
      nextBestActions: [
        "Invite finance reviewers into the approval stream before the next billing cycle.",
        "Consolidate document access under the global entity to reduce access requests.",
        "Use the quarterly report drill-down to review the highest-delay workstream.",
      ],
    },
  };
}
