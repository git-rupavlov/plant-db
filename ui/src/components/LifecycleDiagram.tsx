import { useEffect, useRef } from "react";
import mermaid from "mermaid";

const diagram = `
flowchart LR
  Seed[Seed] --> Germination[Germination]
  Germination --> Vegetative[Vegetative growth]
  Vegetative --> Flowering[Flowering]
  Flowering --> Fruiting[Fruiting]
  Fruiting --> Harvest[Harvest]
  Harvest --> SeedMaturity[Seed maturity]
`;

export function LifecycleDiagram() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "strict"
    });

    async function renderDiagram() {
      if (!ref.current) return;
      const { svg } = await mermaid.render("plant-lifecycle-diagram", diagram);
      ref.current.innerHTML = svg;
    }

    renderDiagram().catch((error) => {
      if (ref.current) {
        ref.current.textContent = `Failed to render diagram: ${error}`;
      }
    });
  }, []);

  return <div className="diagram" ref={ref} />;
}
