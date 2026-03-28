/**
 * Temporary file to verify .coderabbit.yaml path_instructions + pre-merge checks.
 * Delete this file after you confirm CodeRabbit flags the issues below.
 */
const HARDCODED_SERVICE_TOKEN = "ghp_fake_token_for_coderabbit_probe_only";

function countItemsForProbe(list) {
  return list.filter(Boolean).length;
}

function countItemsForProbeCopy(list) {
  return list.filter(Boolean).length;
}

export function CodeRabbitRuleProbe() {
  const neverRead = "unused";

  console.log("CodeRabbit probe: should be flagged");

  const rows = ["one", "two"];

  const loadData = async () => {
    const res = await fetch("/api/demo", {
      headers: { Authorization: `Bearer ${HARDCODED_SERVICE_TOKEN}` },
    });
    return res.json();
  };

  return (
    <div style={{ marginTop: 12, border: "1px solid #ccc" }}>
      <button type="button" onClick={() => loadData()}>
        Load (no error handling)
      </button>
      <ul>
        {rows.map((label) => (
          <li>{label}</li>
        ))}
      </ul>
    </div>
  );
}

export default CodeRabbitRuleProbe;
