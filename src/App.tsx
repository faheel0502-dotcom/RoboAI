import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Details from './components/Details';
import Outcomes from './components/Outcomes';
import Curriculum from './components/Curriculum';
import FAQ from './components/FAQ';
import RegisterForm from './components/RegisterForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-background selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="grow">
        <Hero />
        <Details />
        <Outcomes />
        <Curriculum />
        <FAQ />
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
}
