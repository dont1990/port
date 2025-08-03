"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { motion } from "framer-motion";
import { colorSchemes, type ColorScheme } from "@/app/lib/theme/color-schemes";
import { useColorScheme } from "@/app/components/theme-provider"; // Import useColorScheme

interface ThemePreviewProps {
  scheme: ColorScheme;
  isActive: boolean;
  onClick: () => void;
}

export function ThemePreview({ scheme, isActive, onClick }: ThemePreviewProps) {
  const schemeData = colorSchemes[scheme];
  const { setColorScheme } = useColorScheme(); // Use the hook to get setColorScheme

  const handleInternalClick = () => {
    setColorScheme(scheme); // Set the color scheme via context
    // Add a brief transition effect for the primary color
    document.documentElement.style.setProperty("--primary", schemeData.primary);
    document.documentElement.style.setProperty(
      "--primary-foreground",
      schemeData.primaryForeground
    );
    document.documentElement.style.setProperty("--ring", schemeData.primary);
    document.documentElement.style.transition = "all 0.3s ease";
    setTimeout(() => {
      document.documentElement.style.transition = "";
    }, 300);
    onClick(); // Call the passed onClick for any parent logic
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={handleInternalClick}
    >
      <Card
        className={`overflow-hidden transition-all ${
          isActive ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
        }`}
      >
        <CardContent className="p-4">
          {/* Color Preview - now uses primary color */}
          <div
            className="h-16 rounded-lg mb-3"
            style={{ backgroundColor: `hsl(${schemeData.primary})` }}
          />

          {/* Theme Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">{schemeData.name}</h3>
              {isActive && (
                <Badge variant="default" className="text-xs">
                  Active
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {schemeData.description}
            </p>
          </div>

          {/* Mini Component Preview */}
          <div className="mt-3 space-y-2">
            <div className="flex space-x-2">
              <div className="h-2 bg-primary/20 rounded flex-1" />
              <div className="h-2 bg-primary/40 rounded flex-1" />
              <div className="h-2 bg-primary rounded w-8" />
            </div>
            <div className="flex space-x-1">
              <div className="h-1 bg-primary/30 rounded flex-1" />
              <div className="h-1 bg-primary/50 rounded flex-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
