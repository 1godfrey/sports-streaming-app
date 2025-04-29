import { Link as WouterLink } from 'wouter';

export default function UploadCTA() {
  return (
    <section className="py-12 px-4 bg-dark text-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Share Your Game With The World</h2>
          <p className="text-gray-300 text-lg mb-8">Upload your team's matches, tournaments, or highlight reels and get discovered by fans worldwide</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="inline-block">
              <WouterLink href="/upload">
                <span className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition duration-200 cursor-pointer">
                  <i className="fas fa-upload mr-2"></i> Upload Your Game
                </span>
              </WouterLink>
            </div>
            <div className="inline-block">
              <WouterLink href="/how-it-works">
                <span className="bg-transparent border border-white hover:bg-white/10 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition duration-200 cursor-pointer">
                  <i className="fas fa-info-circle mr-2"></i> How It Works
                </span>
              </WouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
