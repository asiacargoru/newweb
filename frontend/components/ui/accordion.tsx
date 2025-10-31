'use client'

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { AccordionSingleProps, AccordionMultipleProps } from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const AccordionRoot = AccordionPrimitive.Root as unknown as React.ComponentType<any>;

const Accordion = React.forwardRef<HTMLDivElement, AccordionSingleProps | AccordionMultipleProps>(
  ({ className, ...props }, ref) => (
    <AccordionRoot ref={ref as any} className={className} {...(props as any)} />
  ),
);
Accordion.displayName = "Accordion";

type SimpleAccordionItemProps = {
  value: string;
  className?: string;
  children?: React.ReactNode;
} & Record<string, any>;

const AccordionItemPrimitive = AccordionPrimitive.Item as unknown as React.ComponentType<any>;

const AccordionItem = React.forwardRef<HTMLDivElement, SimpleAccordionItemProps>(({ className, ...props }, ref) => (
  <AccordionItemPrimitive ref={ref as any} className={cn("border-b", className)} {...(props as any)} />
));
AccordionItem.displayName = "AccordionItem";

type SimpleAccordionTriggerProps = {
  className?: string;
  children?: React.ReactNode;
} & Record<string, any>;

const AccordionHeaderPrimitive = AccordionPrimitive.Header as unknown as React.ComponentType<any>;
const AccordionTriggerPrimitive = AccordionPrimitive.Trigger as unknown as React.ComponentType<any>;

const AccordionTrigger = React.forwardRef<HTMLButtonElement, SimpleAccordionTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionHeaderPrimitive className="flex">
      <AccordionTriggerPrimitive
        ref={ref as any}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...(props as any)}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionTriggerPrimitive>
    </AccordionHeaderPrimitive>
  ),
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

type SimpleAccordionContentProps = {
  className?: string;
  children?: React.ReactNode;
} & Record<string, any>;

const AccordionContentPrimitive = AccordionPrimitive.Content as unknown as React.ComponentType<any>;

const AccordionContent = React.forwardRef<HTMLDivElement, SimpleAccordionContentProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionContentPrimitive
      ref={ref as any}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...(props as any)}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionContentPrimitive>
  ),
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
