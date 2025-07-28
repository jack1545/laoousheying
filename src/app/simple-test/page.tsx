export default function SimpleTestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Image Test (No Next.js optimization)</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Test 1: bohe-portpanorama.webp</h2>
          <img 
            src="/gallery/coastal-scenery/bohe-portpanorama.webp" 
            alt="Test 1" 
            style={{ maxWidth: '400px', height: 'auto', border: '1px solid #ccc' }}
            onError={(e) => {
              console.error('Image failed to load:', e.currentTarget.src);
              e.currentTarget.style.border = '2px solid red';
              e.currentTarget.alt = 'FAILED TO LOAD: ' + e.currentTarget.src;
            }}
            onLoad={(e) => {
              console.log('Image loaded successfully:', e.currentTarget.src);
              e.currentTarget.style.border = '2px solid green';
            }}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Test 2: meicheng-rainbow.webp</h2>
          <img 
            src="/gallery/natural-scenery/meicheng-rainbow.webp" 
            alt="Test 2" 
            style={{ maxWidth: '400px', height: 'auto', border: '1px solid #ccc' }}
            onError={(e) => {
              console.error('Image failed to load:', e.currentTarget.src);
              e.currentTarget.style.border = '2px solid red';
              e.currentTarget.alt = 'FAILED TO LOAD: ' + e.currentTarget.src;
            }}
            onLoad={(e) => {
              console.log('Image loaded successfully:', e.currentTarget.src);
              e.currentTarget.style.border = '2px solid green';
            }}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Test 3: makeup.webp</h2>
          <img 
            src="/gallery/cultural-heritage/makeup.webp" 
            alt="Test 3" 
            style={{ maxWidth: '400px', height: 'auto', border: '1px solid #ccc' }}
            onError={(e) => {
              console.error('Image failed to load:', e.currentTarget.src);
              e.currentTarget.style.border = '2px solid red';
              e.currentTarget.alt = 'FAILED TO LOAD: ' + e.currentTarget.src;
            }}
            onLoad={(e) => {
              console.log('Image loaded successfully:', e.currentTarget.src);
              e.currentTarget.style.border = '2px solid green';
            }}
          />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Test 4: sunset-fisherman.webp</h2>
          <img 
            src="/gallery/sunset-twilight/sunset-fisherman.webp" 
            alt="Test 4" 
            style={{ maxWidth: '400px', height: 'auto', border: '1px solid #ccc' }}
            onError={(e) => {
              console.error('Image failed to load:', e.currentTarget.src);
              e.currentTarget.style.border = '2px solid red';
              e.currentTarget.alt = 'FAILED TO LOAD: ' + e.currentTarget.src;
            }}
            onLoad={(e) => {
              console.log('Image loaded successfully:', e.currentTarget.src);
              e.currentTarget.style.border = '2px solid green';
            }}
          />
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Instructions:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Green border = Image loaded successfully</li>
          <li>Red border = Image failed to load</li>
          <li>Check browser console for detailed error messages</li>
          <li>Check Network tab in DevTools to see HTTP status codes</li>
        </ul>
      </div>
    </div>
  );
}