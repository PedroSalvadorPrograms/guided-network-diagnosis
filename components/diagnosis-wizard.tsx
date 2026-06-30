"use client";

import { useMemo, useState } from "react";

type NodeOption = {
  label: string;
  next?: string;
  result?: {
    cause: string;
    recommendation: string;
  };
};

type NodeMap = Record<
  string,
  {
    question: string;
    options: NodeOption[];
  }
>;

const flow: NodeMap = {
  start: {
    question: "Qual sintoma voce quer investigar primeiro?",
    options: [
      { label: "Camera offline", next: "camera-power" },
      { label: "Wi-Fi sem acesso", next: "wifi-link" },
      { label: "Acesso remoto falhando", next: "remote-ddns" },
    ],
  },
  "camera-power": {
    question: "A camera recebe energia e acende leds?",
    options: [
      {
        label: "Nao",
        result: {
          cause: "Falha de alimentacao ou cabo PoE",
          recommendation: "Validar injector, porta do switch e tensao no ponto.",
        },
      },
      {
        label: "Sim",
        result: {
          cause: "Falha de rede ou provisionamento",
          recommendation: "Conferir IP, VLAN, ping e registro no NVR.",
        },
      },
    ],
  },
  "wifi-link": {
    question: "O gateway responde internamente?",
    options: [
      {
        label: "Nao",
        result: {
          cause: "Instabilidade do link ou roteador principal",
          recommendation: "Testar uplink WAN, logs do roteador e energia do modem.",
        },
      },
      {
        label: "Sim",
        result: {
          cause: "Problema de autenticacao ou DNS",
          recommendation: "Revisar SSID, DHCP, DNS e captive portal.",
        },
      },
    ],
  },
  "remote-ddns": {
    question: "O servico DDNS ou IP publico foi validado?",
    options: [
      {
        label: "Nao",
        result: {
          cause: "Endereco externo desatualizado",
          recommendation: "Conferir DDNS, NAT e bloqueios do provedor.",
        },
      },
      {
        label: "Sim",
        result: {
          cause: "Regra de acesso remoto ou credencial incorreta",
          recommendation: "Validar portas, usuario remoto e regra de firewall.",
        },
      },
    ],
  },
};

export function DiagnosisWizard() {
  const [step, setStep] = useState("start");
  const [summary, setSummary] = useState("");

  const node = flow[step];
  const hasSummary = summary.length > 0;

  const progressLabel = useMemo(() => {
    if (hasSummary) return "Resumo pronto";
    if (step === "start") return "Escolha o sintoma";
    return "Investigacao em andamento";
  }, [hasSummary, step]);

  function handleOption(option: NodeOption) {
    if (option.result) {
      const resultText = [
        "Diagnostico inicial",
        "",
        "Causa provavel: " + option.result.cause,
        "Acao sugerida: " + option.result.recommendation,
      ].join("\n");

      setSummary(resultText);
      return;
    }

    if (option.next) {
      setStep(option.next);
    }
  }

  async function copySummary() {
    if (!summary) return;
    await navigator.clipboard.writeText(summary);
  }

  return (
    <section className="grid grid-2">
      <article className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Fluxo guiado</p>
            <h2>{node.question}</h2>
          </div>
          <span className="badge badge-ok">{progressLabel}</span>
        </div>

        <div className="option-grid">
          {node.options.map((option) => (
            <button className="option-card" key={option.label} onClick={() => handleOption(option)} type="button">
              <strong>{option.label}</strong>
              <span>Selecionar e continuar</span>
            </button>
          ))}
        </div>

        <div className="row-actions">
          <button className="ghost-button" onClick={() => { setStep("start"); setSummary(""); }} type="button">
            Reiniciar fluxo
          </button>
        </div>
      </article>

      <article className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Saida pronta</p>
            <h2>Resumo para atendimento</h2>
          </div>
        </div>
        <div className="preview-box tall">
          <pre>{summary || "Selecione um caminho no diagnostico para gerar um resumo tecnico."}</pre>
        </div>
        <div className="row-actions">
          <button className="primary-button" onClick={copySummary} type="button">
            Copiar resumo
          </button>
        </div>
      </article>
    </section>
  );
}
