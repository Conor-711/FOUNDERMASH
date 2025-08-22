import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4">
      <Link href="/" className="text-[#0b88b6] font-bold">← Back to Choose</Link>
      
      <div className="mt-6 text-center">
        <h1 className="text-3xl font-extrabold mb-8">ABOUT</h1>

        <div className="mb-8">
          <p className="text-xl italic text-gray-800 mb-8">
            &quot;Were we let in for being based? No. Will we be judged on it? Yes.&quot;
          </p>
        </div>

        <div className="space-y-4 text-center">
          {/* ABOUT FACEMASH Section */}
          <section className="rounded p-4">
            <h2 className="uppercase text-sm font-bold mb-3 tracking-wide">About FounderMash</h2>
            <div className="mb-4">
              <p className="text-lg text-gray-700 mb-3">
                FounderMash is a fun experiment.
              </p>
              
              <p className="text-base text-gray-700 mb-2">
              <strong>Two crypto founders&apos; photos are shown side by side. Click on the one you find more based</strong>.
              </p>
              <p className="text-base text-gray-700 mb-3">
              <strong>Each choice updates the ranking using the Elo rating system an d everyone begins at 1000 points.</strong>.
              </p>
            </div>
          </section>

          {/* ABOUT REASON Section */}
          <section className="rounded">
            <h2 className="uppercase text-sm font-bold mb-3 tracking-wide">About Reason</h2>
            <div className="mb-4">
              <p className="text-base text-gray-700 mb-2">
              As a fresh entrant this cycle, I really appreciate what founders have contributed to the industry.
              </p>
              <p className="text-base text-gray-700 mb-2">
              Whether they stick around or not.
              </p>
              <p className="text-base text-gray-700 mb-3">
              So I built this website to capture it, inspired by <strong>Facemash</strong> — the predecessor of Facebook.
              </p>
              <p className="text-base text-gray-700 mb-3">
              Have fun!
              </p>
            </div>
          </section>
          <section className="rounded">
            <div className="mb-4">
              <Image 
                src="/zuck.png" 
                alt="Zuckerberg" 
                width={250}
                height={200}
                className="mx-auto max-w-full h-auto rounded"
              />
            </div>
          </section>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Created by <a href="https://x.com/Conor_711" target="_blank" rel="noopener noreferrer" className="text-[#0b88b6] font-bold hover:underline">Conor</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
