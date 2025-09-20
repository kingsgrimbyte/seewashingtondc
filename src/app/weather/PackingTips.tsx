'use client';

import { useState } from 'react';

export default function PackingTips() {
  const [activeSeason, setActiveSeason] = useState('spring');

  const packingData = {
    spring: {
      name: 'Spring & Fall',
      icon: '🌸',
      color: 'from-[#b84435] to-[#113b5c]',
      description: 'Versatile layers for changing temperatures throughout the day',
      essentials: [
        'Light jacket or cardigan',
        'Short sleeves or light sweaters',
        'Comfortable walking shoes',
        'Light scarf for cooler evenings',
        'Umbrella for spring showers'
      ],
      tips: [
        'Pack layers you can easily add or remove',
        'Light jacket works well for cooler mornings and evenings',
        'Short sleeves perfect for midday warmth',
        'Comfortable walking shoes are essential for sightseeing',
        'Spring brings occasional rain, so pack accordingly'
      ]
    },
    summer: {
      name: 'Summer',
      icon: '☀️',
      color: 'from-[#b84435] to-[#113b5c]',
      description: 'Lightweight, breathable fabrics to handle heat and humidity',
      essentials: [
        'Breathable cotton or linen clothing',
        'Sunscreen (SPF 30+)',
        'Sunglasses and wide-brimmed hat',
        'Refillable water bottle',
        'Light rain jacket or compact umbrella'
      ],
      tips: [
        'Choose breathable, lightweight fabrics like cotton or linen',
        'Bring sunscreen, sunglasses, and hat for sun protection',
        'Stay hydrated with a refillable water bottle',
        'Pack a compact umbrella for quick summer showers',
        'Plan outdoor activities in morning or evening'
      ]
    },
    winter: {
      name: 'Winter',
      icon: '❄️',
      color: 'from-[#113b5c] to-[#b84435]',
      description: 'Warm, insulated layers for cold temperatures and potential snow',
      essentials: [
        'Warm, insulated coat',
        'Thermal tops or sweaters',
        'Gloves, scarf, and warm hat',
        'Waterproof or sturdy walking boots',
        'Warm socks and thermal underwear'
      ],
      tips: [
        'Choose a warm, insulated coat for cold winds',
        'Layer thermal tops or sweaters under outerwear',
        'Don\'t forget gloves, scarf, and hat',
        'Waterproof boots help with snowy or icy sidewalks',
        'Indoor attractions are perfect for staying warm'
      ]
    }
  };

  const activeSeasonData = packingData[activeSeason as keyof typeof packingData];

  return (
    <section className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Packing Tips Based on Season
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Smart packing makes all the difference in Washington, DC. Our seasonal packing guides 
          help you stay comfortable and prepared for any weather condition.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Season Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(packingData).map(([key, season]) => (
            <button
              key={key}
              onClick={() => setActiveSeason(key)}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                activeSeason === key
                  ? `bg-gradient-to-r ${season.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <span className="text-2xl mr-2">{season.icon}</span>
              {season.name}
            </button>
          ))}
        </div>

        {/* Active Season Details */}
        {activeSeasonData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Essentials */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className={`bg-gradient-to-r ${activeSeasonData.color} -m-8 mb-8 p-8 rounded-t-3xl text-white`}>
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{activeSeasonData.icon}</span>
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{activeSeasonData.name}</h3>
                    <p className="text-lg opacity-90">{activeSeasonData.description}</p>
                  </div>
                </div>
              </div>
              
              <h4 className="text-2xl font-semibold text-gray-900 mb-6">Essential Items</h4>
              <div className="space-y-4">
                {activeSeasonData.essentials.map((item, index) => (
                  <div key={index} className="flex items-center bg-[#113b5c]/5 rounded-xl p-4 border border-[#113b5c]/10">
                    <div className="w-3 h-3 bg-[#113b5c] rounded-full mr-4"></div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Tips */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="bg-gradient-to-br from-[#113b5c]/5 to-[#113b5c]/10 rounded-2xl p-6 mb-8 border border-[#113b5c]/10">
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">💡 Pro Tips</h4>
                <p className="text-gray-700">
                  Make the most of your visit with these season-specific recommendations 
                  from local experts and frequent visitors.
                </p>
              </div>
              
              <div className="space-y-4">
                {activeSeasonData.tips.map((tip, index) => (
                  <div key={index} className="flex items-start bg-[#b84435]/5 rounded-xl p-4 border border-[#b84435]/10">
                    <div className="w-2 h-2 bg-[#b84435] rounded-full mr-4 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Additional Packing Advice */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-[#113b5c]/5 to-[#113b5c]/10 rounded-2xl p-6 border border-[#113b5c]/10">
            <div className="text-3xl mb-4">🎒</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Always Pack</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Comfortable walking shoes</li>
              <li>• Portable phone charger</li>
              <li>• Small backpack or crossbody bag</li>
              <li>• Reusable water bottle</li>
              <li>• Camera or smartphone</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-[#b84435]/5 to-[#b84435]/10 rounded-2xl p-6 border border-[#b84435]/10">
            <div className="text-3xl mb-4">🌦️</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Weather Prep</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Check 10-day forecast before packing</li>
              <li>• Pack for temperature swings</li>
              <li>• Include rain protection</li>
              <li>• Consider humidity levels</li>
              <li>• Plan for indoor/outdoor activities</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-[#113b5c]/5 to-[#b84435]/10 rounded-2xl p-6 border border-[#113b5c]/10">
            <div className="text-3xl mb-4">📱</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Digital Essentials</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Weather app with alerts</li>
              <li>• Metro app for public transit</li>
              <li>• Museum reservation apps</li>
              <li>• Offline maps downloaded</li>
              <li>• Emergency contact numbers</li>
            </ul>
          </div>
        </div>

        {/* Packing Checklist */}
        <div className="mt-16 bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Ultimate Packing Checklist</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-center">Clothing</h4>
              <div className="space-y-2">
                {['Underwear & socks', 'Pajamas', 'Swimwear', 'Formal outfit', 'Comfortable shoes'].map((item, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <input type="checkbox" className="mr-2" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-center">Toiletries</h4>
              <div className="space-y-2">
                {['Toothbrush & paste', 'Shampoo & soap', 'Deodorant', 'Sunscreen', 'Medications'].map((item, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <input type="checkbox" className="mr-2" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-center">Electronics</h4>
              <div className="space-y-2">
                {['Phone & charger', 'Camera', 'Power bank', 'Headphones', 'Travel adapter'].map((item, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <input type="checkbox" className="mr-2" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-center">Documents</h4>
              <div className="space-y-2">
                {['ID/Passport', 'Credit cards', 'Hotel confirmations', 'Museum tickets', 'Emergency contacts'].map((item, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <input type="checkbox" className="mr-2" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
