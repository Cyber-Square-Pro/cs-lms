import LandingBanner from "@/components/banner";
import { LandingFooter } from "@/components/landing_footer";
import { LandingNavbar } from "@/components/landing_navbar";
import { Services } from "@/components/services";

export default function Home() {
  return (
     <div>
      
      <div className="flex flex-col   min-h-screen py-2"> 
      <LandingNavbar />
      <LandingBanner />
      <Services />
      <LandingFooter />
        </div>
    </div>
  );
}
