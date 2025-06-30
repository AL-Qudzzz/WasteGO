import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, Truck, Award, CalendarDays, ArrowRight, Facebook, Twitter, Instagram, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Home() {
  const howItWorks = [
    {
      icon: <CalendarDays className="w-10 h-10 text-primary" />,
      title: 'Schedule Pickup',
      description: 'Choose a convenient time for us to collect your recyclable waste.',
    },
    {
      icon: <Truck className="w-10 h-10 text-primary" />,
      title: 'Waste Collection',
      description: 'Our team will arrive on time to pick up your sorted recyclables.',
    },
    {
      icon: <Award className="w-10 h-10 text-primary" />,
      title: 'Get Rewards',
      description: 'Earn points for your recycling efforts and redeem exciting rewards.',
    },
  ];

  const partners = [
    { name: "Partner 1", logo: "https://placehold.co/140x70.png", hint: "company logo" },
    { name: "Partner 2", logo: "https://placehold.co/140x70.png", hint: "company logo" },
    { name: "Partner 3", logo: "https://placehold.co/140x70.png", hint: "company logo" },
    { name: "Partner 4", logo: "https://placehold.co/140x70.png", hint: "company logo" },
    { name: "Partner 5", logo: "https://placehold.co/140x70.png", hint: "company logo" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Recycle className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">WasteGo</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary">How it Works</Link>
            <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary">About Us</Link>
            <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary">Contact</Link>
          </nav>
          <div className="hidden md:block">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6">
                  <Link href="/" className="flex items-center gap-2 mb-4">
                    <Recycle className="w-8 h-8 text-primary" />
                    <h1 className="text-2xl font-bold text-primary">WasteGo</h1>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    <Link href="#how-it-works" className="text-lg font-medium text-muted-foreground hover:text-primary">How it Works</Link>
                    <Link href="#about" className="text-lg font-medium text-muted-foreground hover:text-primary">About Us</Link>
                    <Link href="#contact" className="text-lg font-medium text-muted-foreground hover:text-primary">Contact</Link>
                  </nav>
                  <Button asChild className="w-full mt-4">
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-extrabold text-foreground font-headline">
                  Turn Your Waste into Worth
                </h2>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground">
                  A new way to manage your waste and get rewards for it. Join us in making the world a greener place, one pickup at a time.
                </p>
                <Button asChild size="lg" className="mt-8">
                  <Link href="/login">
                    Schedule a Pickup
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <Image src="https://placehold.co/500x500.png" alt="Recycling illustration" width={500} height={500} className="rounded-lg" data-ai-hint="recycling illustration" />
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground font-headline">How It Works</h3>
            <p className="mt-2 text-muted-foreground">A simple three-step process to get you started.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <Card key={index} className="text-center bg-card border-none shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                <CardHeader className="flex items-center justify-center p-0 mb-4">
                  <div className="bg-secondary p-4 rounded-full">
                    {step.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <CardTitle className="text-xl font-semibold text-foreground">{step.title}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="about" className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="flex items-center justify-center">
                <Image src="https://placehold.co/500x400.png" alt="Team photo" width={500} height={400} className="rounded-lg shadow-xl" data-ai-hint="diverse team smiling" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-foreground font-headline">About Us</h3>
                <p className="mt-4 text-muted-foreground">
                  WasteGo was founded with a simple mission: to make recycling accessible, rewarding, and impactful. We believe that collective small actions can lead to significant environmental change. Our platform connects households with local recycling partners, streamlining the process and creating a community dedicated to sustainability.
                </p>
                 <Button asChild variant="link" className="mt-4 px-0">
                  <Link href="#">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="partners" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-foreground font-headline">Our Partners</h3>
                <p className="mt-2 text-muted-foreground">We are proud to collaborate with organizations committed to a sustainable future.</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8">
                {partners.map((partner) => (
                    <Image key={partner.name} src={partner.logo} alt={partner.name} width={140} height={70} className="grayscale hover:grayscale-0 transition-all" data-ai-hint={partner.hint} />
                ))}
            </div>
        </section>
      </main>

      <footer id="contact" className="bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <Recycle className="w-8 h-8 text-primary" />
                        <h1 className="text-2xl font-bold">WasteGo</h1>
                    </Link>
                    <p className="text-sm text-background/80">Turn your waste into worth.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4 text-background">Company</h4>
                    <ul className="space-y-2">
                        <li><Link href="#about" className="text-sm text-background/80 hover:text-primary">About Us</Link></li>
                        <li><Link href="#contact" className="text-sm text-background/80 hover:text-primary">Contact</Link></li>
                        <li><Link href="#" className="text-sm text-background/80 hover:text-primary">Careers</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold mb-4 text-background">Legal</h4>
                    <ul className="space-y-2">
                        <li><Link href="#" className="text-sm text-background/80 hover:text-primary">Privacy Policy</Link></li>
                        <li><Link href="#" className="text-sm text-background/80 hover:text-primary">Terms of Service</Link></li>
                    </ul>
                </div>
                <div>
                     <h4 className="font-semibold mb-4 text-background">Follow Us</h4>
                     <div className="flex gap-4">
                        <Link href="#"><Facebook className="h-6 w-6 text-background/80 hover:text-primary" /></Link>
                        <Link href="#"><Twitter className="h-6 w-6 text-background/80 hover:text-primary" /></Link>
                        <Link href="#"><Instagram className="h-6 w-6 text-background/80 hover:text-primary" /></Link>
                     </div>
                </div>
            </div>
            <div className="mt-8 border-t border-background/20 pt-6 text-center text-sm text-background/80">
                <p>&copy; {new Date().getFullYear()} WasteGo. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
