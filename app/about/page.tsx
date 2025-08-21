import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4">
      <Link href="/" className="text-[#0b88b6] font-bold">← Back to Choose</Link>
      
      <div className="mt-6">
        <h1 className="text-3xl font-extrabold mb-8">About FOUNDERMASH</h1>

        <div className="space-y-6">
          {/* IDEA Section */}
          <section className="border rounded p-6">
            <h2 className="uppercase text-sm font-bold mb-3 tracking-wide">Idea</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                FOUNDERMASH is inspired by the legendary Harvard project that asked the simple question: 
                "Who's hotter?" But instead of judging looks, we're asking: "Who's the more influential crypto founder?"
              </p>
              <p>
                In the fast-moving world of blockchain and cryptocurrency, founders shape entire ecosystems. 
                They build the protocols we use, create the tokens we trade, and envision the decentralized future we're building toward.
              </p>
              <p>
                This platform lets the community decide who truly stands out in the crypto space. 
                Every click is a vote. Every choice reveals something about what we value as a community.
                Your preferences help create a dynamic ranking of the most respected builders in Web3.
              </p>
              <p>
                It's not just about popularity—it's about recognizing the founders who are pushing boundaries, 
                solving real problems, and building the infrastructure for a decentralized world.
              </p>
            </div>
          </section>

          {/* HISTORY Section */}
          <section className="border rounded p-6">
            <h2 className="uppercase text-sm font-bold mb-3 tracking-wide">History</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                The original concept traces back to 2003 when Harvard student Mark Zuckerberg created "Facemash" 
                as a way to compare the attractiveness of fellow students. Though controversial, it demonstrated 
                the addictive nature of comparative ranking systems.
              </p>
              <p>
                FOUNDERMASH adapts this concept for the cryptocurrency and blockchain space, where innovation 
                moves at lightning speed and new influential figures emerge constantly. Instead of superficial 
                comparisons, we focus on the impact, vision, and contributions of crypto founders.
              </p>
              <p>
                Launched in 2024, FOUNDERMASH has become a community-driven platform where crypto enthusiasts, 
                investors, and builders come together to celebrate the founders who are shaping our industry.
                Each comparison helps build a collective understanding of who's truly making a difference.
              </p>
              <p>
                From DeFi pioneers to Layer 1 architects, from exchange builders to NFT innovators—every founder 
                featured here has contributed something significant to the crypto ecosystem. The rankings reflect 
                not just current popularity, but sustained impact and community respect.
              </p>
              <p>
                As the platform grows, so does our understanding of what makes a truly influential crypto founder. 
                Join us in mapping the landscape of blockchain leadership, one comparison at a time.
              </p>
            </div>
          </section>

          {/* Attribution */}
          <section className="border rounded p-6 bg-gray-50">
            <div className="text-center text-sm text-gray-600">
              <p>
                Thanks to <a href="https://www.thecrimson.com/article/2003/11/4/hot-or-not-website-briefly-judges/" target="_blank" rel="noopener noreferrer" className="text-[#0b88b6] underline font-bold">Mark Zuckerberg</a> for the original inspiration.
              </p>
              <p className="mt-2">
                Built for the crypto community, by the crypto community.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
