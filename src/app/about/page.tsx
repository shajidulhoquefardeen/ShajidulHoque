import Image from "next/image";
import Footer from "@/components/layout/Footer";

// We import the assets as required
import spaceImg from "@/../public/assets/Space.png";
import dpwImg from "@/../public/assets/dpw.jpeg";

export const metadata = {
  title: "About | Shajidul Hoque",
  description: "About Shajidul Hoque — Designer, Researcher & Developer.",
};

export default function AboutPage() {
  return (
    <>
      {/* Global Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src={spaceImg}
          alt=""
          fill
          placeholder="blur"
          className="object-cover"
          sizes="100vw"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center pt-32 pb-20 px-6 font-sans">
        
        {/* Header & Profile Image Layout */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-primary">/</span>
            <span className="text-white">About</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            Since you got curious about my life, here’s the full story. Fair warning, it’s not exactly thrilling. And if it ends up putting you to sleep, don’t expect me to wake you up.
          </p>

          {/* Profile Image */}
          <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white/10">
            <Image
              src={dpwImg}
              alt="Shajidul Hoque"
              fill
              className="object-cover object-top"
              sizes="192px"
              priority
            />
          </div>
        </div>

        {/* Typography & Body Content */}
        <div className="w-full max-w-4xl mx-auto text-gray-200 text-lg leading-relaxed space-y-6">
          <p>
            Hello, I am Shajidul Hoque, but you can call me Sajid. I have spent most of my life in front of a computer, designing, building things, watching movies/series and playing games. The rest of the time… I touch grass xD
          </p>
          <p>
            I started designing and editing videos when I was 14, and I have been hooked ever since. Luckily, I have a very supportive family who has always encouraged me to chase what I enjoy. Being the only child, I get all the attention, so yes, I basically live like a king at home.
          </p>
          <p>
            I grew up beside the Karnaphuli River in Chittagong, Bangladesh. As a kid, I wanted to become a software engineer, but life had other plans. I ended up completing both my undergraduate and postgraduate studies in Chemistry instead.
          </p>
          <p>
            Funny enough, I have always loved food, and maybe that passion shaped my career more than I expected. I worked at TBL (PepsiCo) from 2024 to 2026, and now I am in a food research lab (BFF), where I am in charge of the Dairy, Beverage, and Confectionery section. Before that, I started my professional journey as a Lead Designer at Grabbed by Vizyon in 2023, a small startup and the first clothing brand in Bangladesh to introduce reconstructed fashion. Even before that, I was juggling life as a full-time designer and a part-time chemistry student.
          </p>
          <p>
            Keeping books aside, my days usually revolve around playing and watching football, watching movies and series, listening to music, and constantly learning new tools and skills. Maybe that’s what has shaped who I am today.
          </p>
          <p>
            I am a big fan of FC Barcelona, through the good days and the bad, ever since playing FIFA 09 on my PS2. Better Call Saul, Dexter, Breaking Bad, and Kota Factory are my top favorite watches.
          </p>
          <p>
            Listening to music while working and traveling has become a habit for me. Currently, my goto genres are indie pop and soft rock. My most listened to artists would be Arnob, Kaavish, and Murtaza Qizilbash. For me, music is like a time machine. Different songs send me to different times in my life. Nu metal & grunge sends me back to my early teens, while progressive rock and alternate rock send me to my late teens and university days. I am also a guitarist. I bought my first guitar when I was 18, and since then, my random strumming and plucking have helped me find a state of peace whenever I need it, though I don’t get bored very easily.
          </p>
          <p>
            Photography is also something I love very much. Some of my captures have been exhibited in various photo exhibitions, which have given me a lot of awards and recognition.
          </p>
          <p>
            As I mentioned, I love food. Fried rice is my go to meal, and custard is my favorite dessert. Honestly, I could live on those. And I have to give a special mention to lychee. I am definitely a tea person, although coffee works fine too, but if I had to choose, you already know my answer.
          </p>
          <p>
            I am curious to see what lies ahead and how it will shape my story, but one thing I know for sure is that I will never settle.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
