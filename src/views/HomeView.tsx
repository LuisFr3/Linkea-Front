import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import TextoAnimado from "../components/TextoAnimado";

export default function HomeView() {
  return (
    <>
        <Header />
        <main className="bg-gray-100 py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl">
            <div className=" max-w-5xl mx-auto mt-10">
                <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                    <h1 className="text-5xl font-black text-gray-900 animate-fade-in-up">
                        Todas tus <span className="text-cyan-400">Redes Sociales </span>
                        en un enlace
                    </h1>
                    <TextoAnimado/>
                    <SearchForm />
                </div>
            </div>
        </main>
    </>
  )
}
