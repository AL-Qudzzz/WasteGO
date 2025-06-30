import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, Truck, Leaf, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const features = [
    {
      icon: <Recycle className="w-8 h-8 text-primary" />,
      title: 'Schedule Pickups',
      description: 'Easily schedule waste pickups from your home at your convenience.',
    },
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: 'Real-time Tracking',
      description: 'Track your pickup in real-time from scheduling to completion.',
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: 'See Your Impact',
      description: 'Understand your positive environmental impact with our personalized reports.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'Community of Recyclers',
      description: 'Join a growing community dedicated to making a difference.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Recycle className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">WasteGo</h1>
          </div>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 font-headline">
              Turn Your Waste into Worth
            </h2>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              WasteGo makes it simple to recycle your household waste, track your environmental impact, and contribute to a greener planet.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-3xl font-bold text-gray-800 font-headline">How It Works</h3>
                        <p className="mt-4 text-muted-foreground">
                            Our process is designed for your convenience. In just a few simple steps, you can have your waste collected and on its way to being recycled.
                        </p>
                        <ul className="mt-6 space-y-4">
                            <li className="flex items-start">
                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-bold">1</div>
                                <p className="ml-4 text-gray-600"><strong>Schedule:</strong> Log in, tell us what you have, and pick a time.</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-bold">2</div>
                                <p className="ml-4 text-gray-600"><strong>Prepare:</strong> Bag your recyclables and leave them at the designated spot.</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary font-bold">3</div>
                                <p className="ml-4 text-gray-600"><strong>Track:</strong> Our courier picks it up, and you can track the progress live.</p>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-center">
                        <Image src="https://placehold.co/500x400.png" alt="Recycling process illustration" width={500} height={400} className="rounded-lg shadow-xl" data-ai-hint="recycling process infographic" />
                    </div>
                </div>
            </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 font-headline">Why Choose WasteGo?</h3>
            <p className="mt-2 text-muted-foreground">We provide a seamless experience for a sustainable lifestyle.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex items-center justify-center">
                  {feature.icon}
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-semibold text-gray-800">{feature.title}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p>&copy; {new Date().getFullYear()} WasteGo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
