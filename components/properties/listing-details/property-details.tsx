import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PropertyDetailsProps {
  details: {
    interior: {
      appliances: string[];
      flooring: string[];
      heating: string;
      cooling: string;
      basement: string;
      windows: string;
    };
    exterior: {
      roof: string;
      construction: string;
      foundation: string;
      garage: string;
      driveway: string;
      lot: string;
    };
    utilities: {
      water: string;
      sewer: string;
      electricity: string;
      internet: string;
    };
    financial: {
      taxYear: number;
      taxAmount: number;
      hoaFee?: number;
      hoaFrequency?: string;
    };
  };
}

export function PropertyDetails({ details }: PropertyDetailsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Property Details</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="interior">
          <AccordionTrigger>Interior Details</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Appliances</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {details.interior.appliances.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Flooring</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {details.interior.flooring.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Heating: </span>
                  <span className="text-muted-foreground">{details.interior.heating}</span>
                </div>
                <div>
                  <span className="font-medium">Cooling: </span>
                  <span className="text-muted-foreground">{details.interior.cooling}</span>
                </div>
                <div>
                  <span className="font-medium">Basement: </span>
                  <span className="text-muted-foreground">{details.interior.basement}</span>
                </div>
                <div>
                  <span className="font-medium">Windows: </span>
                  <span className="text-muted-foreground">{details.interior.windows}</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="exterior">
          <AccordionTrigger>Exterior Details</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Roof: </span>
                  <span className="text-muted-foreground">{details.exterior.roof}</span>
                </div>
                <div>
                  <span className="font-medium">Construction: </span>
                  <span className="text-muted-foreground">{details.exterior.construction}</span>
                </div>
                <div>
                  <span className="font-medium">Foundation: </span>
                  <span className="text-muted-foreground">{details.exterior.foundation}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Garage: </span>
                  <span className="text-muted-foreground">{details.exterior.garage}</span>
                </div>
                <div>
                  <span className="font-medium">Driveway: </span>
                  <span className="text-muted-foreground">{details.exterior.driveway}</span>
                </div>
                <div>
                  <span className="font-medium">Lot: </span>
                  <span className="text-muted-foreground">{details.exterior.lot}</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="utilities">
          <AccordionTrigger>Utilities</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Water: </span>
                  <span className="text-muted-foreground">{details.utilities.water}</span>
                </div>
                <div>
                  <span className="font-medium">Sewer: </span>
                  <span className="text-muted-foreground">{details.utilities.sewer}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Electricity: </span>
                  <span className="text-muted-foreground">{details.utilities.electricity}</span>
                </div>
                <div>
                  <span className="font-medium">Internet: </span>
                  <span className="text-muted-foreground">{details.utilities.internet}</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="financial">
          <AccordionTrigger>Financial Details</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Property Tax ({details.financial.taxYear}): </span>
                <span className="text-muted-foreground">${details.financial.taxAmount.toLocaleString()}/year</span>
              </div>
              {details.financial.hoaFee && (
                <div>
                  <span className="font-medium">HOA Fee: </span>
                  <span className="text-muted-foreground">
                    ${details.financial.hoaFee}/
                    {details.financial.hoaFrequency || 'month'}
                  </span>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}