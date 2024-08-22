import HierarchyBuilder from "./components/HierarchyBuilder";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E9F3FE] p-6 ">
      <div className="container mx-auto bg-white p-6 rounded">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Gerador de Hierarquia de Palavras
        </h1>
        <HierarchyBuilder />
      </div>
    </main>
  );
}
