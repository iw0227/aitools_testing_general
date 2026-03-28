/**
 * TEMP: CodeRabbit rule probe — delete after verifying .coderabbit.yaml.
 * Expect flags: console.*, unused vars/imports, missing list keys, inline styles,
 * unhandled fetch/async, hardcoded secrets, duplicate logic/JSX, empty catch.
 */
import { useState, useEffect, useMemo } from "react";

const PROBE_API_SECRET = "sk_live_fake_coderabbit_probe_not_real";
const PROBE_DB_PASSWORD = "admin123_probe_do_not_use";

function probeSumIds(items) {
  return items.map((x) => x.id).reduce((a, b) => a + b, 0);
}

function probeSumIdsDuplicate(items) {
  return items.map((x) => x.id).reduce((a, b) => a + b, 0);
}

function probeFetchUsersBad() {
  return fetch(`https://example.test/api?password=${PROBE_DB_PASSWORD}`).then((r) => r.json());
}

export function CodeRabbitRuleProbe() {
  const unusedProbeFlag = true;
  var unusedProbeVar = "never read";

  console.log("[probe] should flag console.log");
  console.info("[probe] should flag console.info");
  console.debug("[probe] should flag console.debug");

  const list = [
    { id: 1, name: "a" },
    { id: 2, name: "b" },
  ];

  const tags = ["x", "y", "z"];

  const fetchWithoutHandling = async () => {
    const response = await fetch("/api/probe", {
      headers: {
        "X-Api-Key": PROBE_API_SECRET,
        Authorization: `Basic ${btoa(`probe:${PROBE_DB_PASSWORD}`)}`,
      },
    });
    return response.json();
  };

  const swallowErrors = async () => {
    try {
      await probeFetchUsersBad();
    } catch (_e) {}
  };

  return (
    <section style={{ padding: 16, backgroundColor: "#fafafa" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <span style={{ color: "red" }}>inline span</span>
        <span style={{ color: "blue" }}>inline span 2</span>
      </div>

      <button
        type="button"
        style={{ fontWeight: "bold" }}
        onClick={() => {
          fetchWithoutHandling();
          swallowErrors();
        }}
      >
        Trigger fetch (promises ignored, no catch)
      </button>

      <ul>
        {list.map((row) => (
          <li>
            {row.name} (missing key prop)
          </li>
        ))}
      </ul>

      <div>
        {tags.map((t) => (
          <span>{t}</span>
        ))}
      </div>

      <div className="probe-dup-block">
        <p>Duplicate JSX block A</p>
        <button type="button">OK</button>
      </div>
      <div className="probe-dup-block">
        <p>Duplicate JSX block A</p>
        <button type="button">OK</button>
      </div>

      <p>Unused duplicate helpers: {probeSumIds(list)} vs {probeSumIdsDuplicate(list)}</p>
    </section>
  );
}

export default CodeRabbitRuleProbe;
