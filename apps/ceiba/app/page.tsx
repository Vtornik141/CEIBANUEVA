import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { Band } from "../components/Band";
import { Proyectos } from "../components/Proyectos";
import { MetodologiaOACA } from "../components/MetodologiaOACA";
import { Proceso } from "../components/Proceso";
import { Paquetes } from "../components/Paquetes";
import { FormularioBrief } from "../components/FormularioBrief";
import { CTAFinal } from "../components/CTAFinal";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Band />
        <Proyectos />
        <MetodologiaOACA />
        <Proceso />
        <Paquetes />
        <FormularioBrief />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
