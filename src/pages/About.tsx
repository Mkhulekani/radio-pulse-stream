import { Users, Target, Handshake, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pb-24">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">About Newtown Radio</h1>
        <p className="text-xl text-muted-foreground">Broadcasting independent voices since day one</p>
      </div>

      {/* Newtown Radio Story */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Our Story</h2>
        </div>
        <div className="bg-card rounded-2xl p-8 shadow-lg">
          <p className="text-lg text-muted-foreground mb-4">
            Newtown Radio emerged from the vibrant cultural heartbeat of Johannesburg's Newtown district. 
            Founded by a collective of music lovers, artists, and community activists, we set out to create 
            a platform that celebrates diversity, creativity, and authentic voices.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            What started as a small online stream has grown into a vital community hub, connecting listeners 
            across South Africa and beyond. We've stayed true to our roots: independent, community-driven, 
            and committed to showcasing music and stories you won't hear anywhere else.
          </p>
          <p className="text-lg text-muted-foreground">
            Today, we continue to push boundaries, champion local talent, and provide a home for the bold, 
            the experimental, and the authentic. This is radio by the community, for the community.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Mission & Vision</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
            <p className="text-muted-foreground">
              To amplify diverse voices and underground culture through high-quality, community-driven 
              radio programming. We provide a platform for artists, musicians, and storytellers who push 
              creative boundaries and challenge the mainstream.
            </p>
          </div>
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
            <p className="text-muted-foreground">
              To become the leading voice for independent culture in South Africa, fostering a vibrant 
              ecosystem where creativity thrives, communities connect, and authentic stories are told 
              without compromise.
            </p>
          </div>
        </div>
      </section>

      {/* Team Profiles */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-2xl p-6 shadow-lg text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-4xl font-bold text-white">
              TM
            </div>
            <h3 className="text-xl font-bold mb-2">Thabo Malema</h3>
            <p className="text-primary font-semibold mb-3">Station Director</p>
            <p className="text-muted-foreground">
              With 15 years in community radio, Thabo brings vision and passion to everything we broadcast.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 shadow-lg text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-4xl font-bold text-white">
              LN
            </div>
            <h3 className="text-xl font-bold mb-2">Lindiwe Nkosi</h3>
            <p className="text-primary font-semibold mb-3">Music Director</p>
            <p className="text-muted-foreground">
              Lindiwe curates our diverse playlist and discovers the next generation of South African talent.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 shadow-lg text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-pink-600 flex items-center justify-center text-4xl font-bold text-white">
              DJ
            </div>
            <h3 className="text-xl font-bold mb-2">David Jonas</h3>
            <p className="text-primary font-semibold mb-3">Technical Director</p>
            <p className="text-muted-foreground">
              David ensures our broadcast quality is world-class and our technology cutting-edge.
            </p>
          </div>
        </div>
      </section>

      {/* Partners & Sponsors */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Handshake className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Partners & Sponsors</h2>
        </div>
        <div className="bg-card rounded-2xl p-8 shadow-lg">
          <p className="text-muted-foreground mb-8">
            We're grateful for the support of organizations that believe in independent media and community radio.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-muted rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">Arts SA</div>
              <p className="text-sm text-muted-foreground">Supporting creative communities</p>
            </div>
            <div className="text-center p-6 bg-muted rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">Music Foundation</div>
              <p className="text-sm text-muted-foreground">Nurturing local talent</p>
            </div>
            <div className="text-center p-6 bg-muted rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">Community Fund</div>
              <p className="text-sm text-muted-foreground">Empowering grassroots media</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Interested in partnering with us?</p>
            <a 
              href="/contact" 
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
