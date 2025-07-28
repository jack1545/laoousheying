'use client';

export default function GalleryTestPage() {
  const testImages = [
    '/gallery/coastal-scenery/bohe-portpanorama.webp',
    '/gallery/natural-scenery/meicheng-rainbow.webp',
    '/gallery/cultural-heritage/makeup.webp',
    '/gallery/sunset-twilight/sunset-fisherman.webp'
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gallery Images Test</h1>
      <p className="mb-4 text-gray-600">Testing if gallery images can load properly on Vercel</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testImages.map((src, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Test {index + 1}</h3>
            <p className="text-sm text-gray-500 mb-2">{src}</p>
            <img 
              src={src}
              alt={`Test image ${index + 1}`}
              className="w-full h-48 object-cover rounded border"
              onLoad={() => console.log(`✅ Loaded: ${src}`)}
              onError={() => console.error(`❌ Failed: ${src}`)}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p className="text-sm">Check browser console for load/error messages</p>
        <p className="text-sm">Check Network tab for HTTP status codes</p>
      </div>
    </div>
  );
}