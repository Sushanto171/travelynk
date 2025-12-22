"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Send
} from "lucide-react";
const ContactForm = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Send us a message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Full name" />
            <Input type="email" placeholder="Email address" />
          </div>

          <Input placeholder="Subject" />

          <Textarea
            placeholder="Write your message here..."
            className="min-h-[140px]"
          />

          <Button className="w-full gap-2">
            <Send className="w-4 h-4" />
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;