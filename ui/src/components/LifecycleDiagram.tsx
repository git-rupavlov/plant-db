import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";

const diagram = `flowchart LR
  Seed[Seed] --> Germination[Germination]
  Germination --> Seedling[Seedling]
  Seedling --> Vegetative[Vegetative growth]
  Vegetative --> Flowering[Flowering and pollination]
  Flowering --> FruitGrowth[Fruit growth]
  FruitGrowth --> FruitMaturity[Fruit maturity]
  FruitMaturity --> SeedMaturity[Seed maturity]
`;

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  securityLevel: "loose",
  themeVariables: {
    background: "transparent",
    primaryColor: "#172033",
    primaryTextColor: "#e6edf3",
    primaryBorderColor: "#7ee787",
    lineColor: "#8b949e",
    secondaryColor: "#0d1117",
    tertiaryColor: "#1f6feb"
  }
});

export function LifecycleDiagram() {
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<HTMLDivElement | null>(null);
  const [fallback, setFallback] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      if (!ref.current) return;

      const renderId = `plant_lifecycle_${reactId}_${Date.now()}`;
      ref.current.innerHTML = "";

      try {
        const { svg } = await mermaid.render(renderId, diagram);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (error) {
        if (!cancelled) {
          setFallback(error instanceof Error ? error.message : String(error));
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [reactId]);

  if (fallback) {
    return (
      <pre className="diagram-fallback">
        Mermaid render failed: {fallback}
        {"\n\n"}
        Seed → Germination → Seedling → Vegetative growth → Flowering → Fruit growth → Fruit maturity → Seed maturity
      </pre>
    );
  }

  return <div className="diagram" ref={ref} />;
}
