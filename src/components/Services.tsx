import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Home, Handshake, CheckCircle, ChevronDown, Scan, Upload, Camera } from "lucide-react";
import { useState } from "react";

const Services = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdownServices = [
        {
      title: "MOD",
      icon: FileText,
      color: "primary",
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
      color: "primary",
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
      color: "secondary", 
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
      color: "accent",
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
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
          hover: 'hover:bg-blue-100',
          button: 'bg-blue-600 text-white hover:bg-blue-700'
        };
      case 'secondary':
        return {
          bg: 'bg-green-50',
          text: 'text-green-600',
          border: 'border-green-200',
          hover: 'hover:bg-green-100',
          button: 'bg-green-600 text-white hover:bg-green-700'
        };
      case 'accent':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-600',
          border: 'border-purple-200',
          hover: 'hover:bg-purple-100',
          button: 'bg-purple-600 text-white hover:bg-purple-700'
        };
      default:
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
          hover: 'hover:bg-blue-100',
          button: 'bg-blue-600 text-white hover:bg-blue-700'
        };
    }
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleScanDocument = (serviceName, docName) => {
    alert(`Starting scan for: ${docName} (${serviceName})`);
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
            Document <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-6 leading-relaxed">
            Select a service to view required documents. You can scan or upload documents directly for each requirement.
          </p>
        </div>

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
                                    onClick={() => handleScanDocument(service.title, doc)}
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

                        {/* Bulk Actions */}
                        {/* <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Bulk Actions:</h4>
                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-lg ${colors.button} transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex-1 sm:flex-none`}>
                              <Scan className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                              <div className="text-left flex-1 sm:flex-none">
                                <div className="font-semibold text-sm">Scan All Documents</div>
                                <div className="text-xs opacity-90 hidden sm:block">Batch scanning for {service.title}</div>
                              </div>
                            </button>
                            
                            <button className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex-1 sm:flex-none">
                              <Upload className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                              <div className="text-left flex-1 sm:flex-none">
                                <div className="font-semibold text-sm">Upload Multiple Files</div>
                                <div className="text-xs opacity-90 hidden sm:block">Select multiple documents</div>
                              </div>
                            </button>
                          </div>
                        </div> */}
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
          <Card className="max-w-2xl mx-auto border-0 bg-gradient-to-r from-blue-50 via-white to-green-50">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Document Guidelines</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Please ensure all documents are clear, legible, and valid. Our scanning system accepts images (JPG, PNG) and PDF files.
              </p>
              <div className="text-xs sm:text-sm text-gray-500 text-left sm:text-center space-y-1">
                <div>• Maximum file size: 10MB per document</div>
                <div>• Supported formats: JPG, PNG, PDF</div>
                <div>• Ensure documents are well-lit and not blurry</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;