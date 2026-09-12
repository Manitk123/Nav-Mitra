export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} GovInnovate Platform. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-text-secondary hover:text-gov-blue text-sm">Privacy Policy</a>
            <a href="#" className="text-text-secondary hover:text-gov-blue text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
