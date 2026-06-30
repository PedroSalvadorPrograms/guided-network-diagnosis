export type DiagnosticRun = {
  id: string;
  symptom: string;
  suspectedCause: string;
  recommendation: string;
  openedTicket: boolean;
  createdAt: string;
};

export const fallbackRuns: DiagnosticRun[] = [
  {
    id: "DIA-14",
    symptom: "Camera offline",
    suspectedCause: "Falha de alimentacao PoE",
    recommendation: "Validar porta do switch e reiniciar injector.",
    openedTicket: true,
    createdAt: "Hoje, 08:35",
  },
  {
    id: "DIA-13",
    symptom: "Wi-Fi sem internet",
    suspectedCause: "Uplink da operadora indisponivel",
    recommendation: "Testar gateway e registrar evidencias do link WAN.",
    openedTicket: false,
    createdAt: "Ontem, 16:10",
  },
];
