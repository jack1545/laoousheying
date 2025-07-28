export default function TestImagesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Test Image 1: bohe-portpanorama.webp</h2>
          <img
            src="/gallery/coastal-scenery/bohe-portpanorama.webp"
            alt="Test Image 1"
            width={400}
            height={300}
            className="border"
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Test Image 2: meicheng-rainbow.webp</h2>
          <img
            src="/gallery/natural-scenery/meicheng-rainbow.webp"
            alt="Test Image 2"
            width={400}
            height={300}
            className="border"
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Test Image 3: makeup.webp</h2>
          <img
            src="/gallery/cultural-heritage/makeup.webp"
            alt="Test Image 3"
            width={400}
            height={300}
            className="border"
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Test Image 4: sunset-fisherman.webp</h2>
          <img
            src="/gallery/sunset-twilight/sunset-fisherman.webp"
            alt="Test Image 4"
            width={400}
            height={300}
            className="border"
          />
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Direct img tags (bypass Next.js optimization):</h2>
        <div className="grid grid-cols-2 gap-4">
          <img 
            src="/gallery/coastal-scenery/bohe-portpanorama.webp" 
            alt="Direct img 1" 
            width="400" 
            height="300" 
            className="border"
          />
          <img 
            src="/gallery/natural-scenery/meicheng-rainbow.webp" 
            alt="Direct img 2" 
            width="400" 
            height="300" 
            className="border"
          />
        </div>
      </div>
    </div>
  );
}