import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Differentiators from '@/components/Differentiators'
import ProgramOverview from '@/components/ProgramOverview'
import SoftwareSection from '@/components/SoftwareSection'
import Faculty from '@/components/Faculty'
import BusinessModule from '@/components/BusinessModule'
import Benefits from '@/components/Benefits'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Differentiators />
        <ProgramOverview />
        <SoftwareSection />
        <Faculty />
        <BusinessModule />
        <Benefits />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
