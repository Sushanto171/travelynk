"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewslatterForm() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <h4 className="text-lg font-semibold  mb-4">
        Stay Updated on New Destinations
      </h4>
      <div className="flex flex-col sm:flex-row gap-3 max-w-md">
        {/* Replaced with mock Input and Button from shadcn */}
        <Input placeholder="Enter your email address" className="flex-grow" />
        <Button>
          Subscribe
        </Button>
      </div>
    </div>
  );
}