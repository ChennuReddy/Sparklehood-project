const incidentList = document.getElementById('incidentList');
const severityFilter = document.getElementById('severityFilter');
const dateSort = document.getElementById('dateSort');
const incidentForm = document.getElementById('incidentForm');

let incidents = [
  { id: 1, title: "Biased Recommendation Algorithm", description: "Algorithm consistently favored certain demographics...", severity: "Medium", reported_at: "2025-03-15T10:00:00Z" },
  { id: 2, title: "LLM Hallucination in Critical Info", description: "LLM provided incorrect safety procedure information...", severity: "High", reported_at: "2025-04-01T14:30:00Z" },
  { id: 3, title: "Minor Data Leak via Chatbot", description: "Chatbot inadvertently exposed non-sensitive user metadata...", severity: "Low", reported_at: "2025-03-20T09:15:00Z" }
];

function renderIncidents() {
  incidentList.innerHTML = "";

  let filtered = incidents.filter(incident => {
    if (severityFilter.value === "All") return true;
    return incident.severity === severityFilter.value;
  });

  filtered.sort((a, b) => {
    return dateSort.value === "Newest"
      ? new Date(b.reported_at) - new Date(a.reported_at)
      : new Date(a.reported_at) - new Date(b.reported_at);
  });

  filtered.forEach(incident => {
    const div = document.createElement('div');
    div.className = 'incident';
    div.innerHTML = `
      <div class="incident-header">
        <div>
          <strong>${incident.title}</strong><br>
          <small>Severity: ${incident.severity}</small><br>
          <small>Reported: ${new Date(incident.reported_at).toLocaleString()}</small>
        </div>
        <button onclick="toggleDetails(${incident.id})">View Details</button>
      </div>
      <div class="incident-details" id="details-${incident.id}">
        <p>${incident.description}</p>
      </div>
    `;
    incidentList.appendChild(div);
  });
}

function toggleDetails(id) {
  const details = document.getElementById(`details-${id}`);
  details.style.display = details.style.display === 'block' ? 'none' : 'block';
}

severityFilter.addEventListener('change', renderIncidents);
dateSort.addEventListener('change', renderIncidents);

incidentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const severity = document.getElementById('severity').value;

  if (!title || !description || !severity) {
    alert("Please fill in all fields.");
    return;
  }

  const newIncident = {
    id: incidents.length + 1,
    title,
    description,
    severity,
    reported_at: new Date().toISOString()
  };

  incidents.push(newIncident);
  incidentForm.reset();
  renderIncidents();
});

renderIncidents();
