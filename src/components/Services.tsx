import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Home, Handshake, CheckCircle, ChevronDown, Upload, Camera } from "lucide-react";
import { useState, useRef } from "react";

const Services = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentScanningDoc, setCurrentScanningDoc] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const dropdownServices = [
    {
      title: "MOD",
      icon: FileText,
      color: "primary", // All sections use same color
      documents: [
        "Aadhar card - loaner",
        "Aadhar card - 2 witness",
        "Properity document",
        "Online patta"
      ]
    },
    {
      title: "MOD (Cancel)",
      icon: FileText,
      color: "primary", // Same color
      documents: [
        "Aadhar card - loaner",
        "Aadhar card - 2 witness",
        "Mod Original document",
        "Online patta"
      ]
    },
    {
      title: "Sales",
      icon: Home,
      color: "primary", // Same color
      documents: [
        "Aadhar card – giver",
        "Aadhar card – getter",
        "Aadhar card – 2 witnesses",
        "GPS photo",
        "Properity document",
        "Online patta"
      ]
    },
    {
      title: "Settlement",
      icon: Handshake,
      color: "primary", // Same color
      documents: [
        "Aadhar card – giver",
        "Aadhar card – getter", 
        "Aadhar card – 2 witnesses",
        "GPS photo",
        "Properity document",
        "Online patta"
      ]
    }
  ];

  const getColorClasses = (color) => {
    // All sections use the same blue color scheme
    return {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:bg-blue-100',
      button: 'bg-blue-600 text-white hover:bg-blue-700'
    };
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const startCamera = async (serviceName, docName) => {
    try {
      setCurrentScanningDoc({ service: serviceName, document: docName });
      setIsCameraActive(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Use back camera on mobile
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to blob and handle the captured image
      canvas.toBlob((blob) => {
        if (blob && currentScanningDoc) {
          const fileName = `${currentScanningDoc.service}_${currentScanningDoc.document}_${new Date().getTime()}.jpg`;
          alert(`Document captured: ${fileName}`);
          
          // Here you can send the blob to your server or handle it as needed
          console.log('Captured document:', blob);
        }
        stopCamera();
      }, 'image/jpeg', 0.8);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraActive(false);
    setCurrentScanningDoc(null);
  };

  const handleUploadDocument = (serviceName, docName) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,application/pdf';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (file) {
        alert(`Uploading: ${file.name} for ${docName} (${serviceName})`);
      }
    };
    input.click();
  };

  return (
    <section id="services" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 px-2">
            Document <span className="bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-6 leading-relaxed">
            Select a service to view required documents. You can scan or upload documents directly for each requirement.
          </p>
        </div>

        {/* Camera Modal */}
        {isCameraActive && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-4 w-full max-w-md">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">
                  Scanning: {currentScanningDoc?.document}
                </h3>
                <p className="text-sm text-gray-600">
                  Service: {currentScanningDoc?.service}
                </p>
              </div>
              
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover rounded-lg bg-gray-200"
                />
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
              </div>
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={capturePhoto}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-4 h-4 inline mr-2" />
                  Capture
                </button>
                <button
                  onClick={stopCamera}
                  className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Services Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {dropdownServices.map((service, index) => {
              const Icon = service.icon;
              const colors = getColorClasses(service.color);
              const isOpen = activeDropdown === index;
              
              return (
                <Card key={index} className={`border-2 ${colors.border} overflow-hidden transition-all duration-300 hover:shadow-lg mx-1 sm:mx-0`}>
                  {/* Service Header */}
                  <div 
                    className={`cursor-pointer ${colors.hover} transition-colors duration-200`}
                    onClick={() => toggleDropdown(index)}
                  >
                    <CardHeader className="py-4 sm:py-6 px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${colors.bg} rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${colors.text}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                              {service.title}
                            </CardTitle>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 hidden sm:block">
                              Click to view documents & scanning options
                            </p>
                            <p className="text-xs text-gray-600 mt-1 sm:hidden">
                              Tap to view options
                            </p>
                          </div>
                        </div>
                        <ChevronDown 
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.text} transition-transform duration-300 flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} 
                        />
                      </div>
                    </CardHeader>
                  </div>

                  {/* Expanded Content */}
                  {isOpen && (
                    <CardContent className="border-t border-gray-200 bg-gray-50 px-3 sm:px-6">
                      <div className="py-4 sm:py-6">
                        <h4 className="font-semibold text-gray-900 mb-4 sm:mb-6 text-base sm:text-lg">Required Documents:</h4>
                        
                        {/* Documents List */}
                        <div className="space-y-3 sm:space-y-4">
                          {service.documents.map((doc, docIndex) => (
                            <div 
                              key={docIndex}
                              className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow duration-200"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                {/* Document Info */}
                                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                  <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.text} flex-shrink-0`} />
                                  <span className="text-sm sm:text-base font-medium text-gray-900 break-words">{doc}</span>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex gap-2 flex-shrink-0">
                                  <button 
                                    onClick={() => startCamera(service.title, doc)}
                                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg ${colors.button} transition-colors duration-200 text-xs sm:text-sm font-medium flex-1 sm:flex-none justify-center`}
                                  >
                                    <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden xs:inline">Scan</span>
                                  </button>
                                  <button 
                                    onClick={() => handleUploadDocument(service.title, doc)}
                                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200 text-xs sm:text-sm font-medium flex-1 sm:flex-none justify-center"
                                  >
                                    <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden xs:inline">Upload</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-12 sm:mt-16 text-center px-2">
          <Card className="max-w-2xl mx-auto border-0 bg-gradient-to-r from-blue-50 via-white to-blue-50">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Document Guidelines</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Please ensure all documents are clear, legible, and valid. Use the camera to scan documents or upload existing files.
              </p>
              <div className="text-xs sm:text-sm text-gray-500 text-left sm:text-center space-y-1">
                <div>• Camera will use back camera for better quality</div>
                <div>• Captured images are saved as high-quality JPEGs</div>
                <div>• Ensure documents are well-lit and not blurry</div>
                <div>• Upload supports JPG, PNG, PDF formats</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;