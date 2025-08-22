import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pledge-to-Ride - Coming Soon',
  description: 'Support Pedal for P-Man from anywhere by pledging per mile. Coming soon!',
};

export default function PledgePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Pledge-to-Ride</h1>
        
        <div className="bg-blue-50 p-12 rounded-lg mb-12">
          <div className="text-6xl mb-6">🚴‍♂️</div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Coming Soon!</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Can't make it to the ride? Soon you'll be able to pledge a dollar amount per mile 
            and support our mission from anywhere. We're working on making this feature available 
            for the 2025 ride.
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg mb-12">
          <h3 className="text-2xl font-bold mb-4">How It Will Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">💝</div>
              <h4 className="font-bold mb-2">Choose Your Pledge</h4>
              <p className="text-gray-700">Select how much you want to pledge per mile our riders complete.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-bold mb-2">Track Progress</h4>
              <p className="text-gray-700">Follow along as our riders log miles during the event.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold mb-2">Make Impact</h4>
              <p className="text-gray-700">Your pledge helps fund grants that create "one more good day."</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-lg text-gray-700 mb-6">
            Want to be notified when Pledge-to-Ride goes live? 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/pedal"
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Join the Ride Instead
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}