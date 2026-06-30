import { AppShell } from "@/components/app-shell";
import { MetricCard } from "@/components/metric-card";
import { DiagnosisWizard } from "@/components/diagnosis-wizard";
import { fallbackRuns } from "@/lib/demo-data";

export default function Page() {
  const openedTickets = fallbackRuns.filter((run) => run.openedTicket).length;

  return (
    <AppShell
      project="Diagnostico Guiado"
      title="Triagem tecnica com poucos cliques"
      subtitle="Projeto ideal para mostrar suporte, logica de fluxo e clareza operacional sem depender de um design complexo."
      badge="MVP para primeiro atendimento"
      navigation={[
        { label: "Fluxo", hint: "Perguntas baseadas em sintoma" },
        { label: "Resumo", hint: "Saida pronta para o chamado" },
        { label: "Historico", hint: "Exemplos de diagnosticos anteriores" },
      ]}
    >
      <section className="metrics">
        <MetricCard label="Fluxos base" value="3" helper="Camera, Wi-Fi e acesso remoto" />
        <MetricCard label="Resumos rapidos" value="1 clique" helper="Texto pronto para o suporte" tone="success" />
        <MetricCard label="Chamados abertos" value={String(openedTickets)} helper="Exemplos do demo" tone="warning" />
        <MetricCard label="Frontend" value="Enxuto" helper="Foco total no fluxo tecnico" />
      </section>

      <DiagnosisWizard />

      <section className="grid grid-2">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Historico</p>
              <h2>Diagnosticos recentes</h2>
            </div>
          </div>
          <div className="stack compact">
            {fallbackRuns.map((run) => (
              <div className="list-card" key={run.id}>
                <div className="row-between">
                  <strong>{run.symptom}</strong>
                  <span className={run.openedTicket ? "badge badge-warning" : "badge badge-ok"}>
                    {run.openedTicket ? "ticket aberto" : "resolvido"}
                  </span>
                </div>
                <p>{run.suspectedCause}</p>
                <p className="muted">{run.recommendation}</p>
                <p className="muted">{run.createdAt}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Valor no portfolio</p>
              <h2>Por que esse projeto chama atencao</h2>
            </div>
          </div>
          <ul className="list">
            <li>
              <strong>Resolve problema real</strong>
              <span>A triagem inicial economiza tempo da equipe de suporte e padroniza diagnosticos.</span>
            </li>
            <li>
              <strong>Mostra logica de produto</strong>
              <span>Voce demonstra organizacao de fluxo, estados e tomada de decisao.</span>
            </li>
            <li>
              <strong>Escala facil</strong>
              <span>Da para adicionar novos sintomas e integrar com abertura de chamados depois.</span>
            </li>
          </ul>
        </article>
      </section>
    </AppShell>
  );
}
