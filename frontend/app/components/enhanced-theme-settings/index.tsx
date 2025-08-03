"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Palette,
  Monitor,
  Moon,
  Sun,
  Sparkles,
  Shuffle,
} from "lucide-react";
import { useColorScheme } from "@/app/components/theme-provider";
import { colorSchemes, type ColorScheme } from "@/app/lib/theme/color-schemes";
import { ThemePreview } from "@/app/components/theme-preview";
import { useClickOutside } from "@/app/hooks/useClickOutside";

export function EnhancedThemeSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { colorScheme, setColorScheme } = useColorScheme();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useClickOutside([menuRef, buttonRef], () => setIsOpen(false), isOpen);

  const themeOptions = [
    {
      value: "light",
      label: "Light",
      icon: Sun,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "dark",
      label: "Dark",
      icon: Moon,
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "system",
      label: "System",
      icon: Monitor,
      color: "bg-gray-100 text-gray-800",
    },
  ];

  const handleRandomScheme = () => {
    const schemes = Object.keys(colorSchemes) as ColorScheme[];
    const currentIndex = schemes.indexOf(colorScheme as ColorScheme);
    const availableSchemes = schemes.filter(
      (_, index) => index !== currentIndex
    );
    const randomScheme =
      availableSchemes[Math.floor(Math.random() * availableSchemes.length)];

    setColorScheme(randomScheme);
    const schemeData = colorSchemes[randomScheme];
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
  };

  return (
    <div className="fixed bottom-20 right-8 z-50">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
          aria-label="Enhanced theme settings"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Settings className="h-4 w-4" />
          </motion.div>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="absolute bottom-16 right-0 w-[480px]"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="shadow-xl border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">
                      Theme Customization
                    </CardTitle>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRandomScheme}
                    >
                      <Shuffle className="h-4 w-4 mr-2" />
                      Random
                    </Button>
                  </motion.div>
                </div>
                <CardDescription>
                  Customize your visual experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="colors" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="colors"
                      className="flex items-center space-x-2"
                    >
                      <Palette className="h-4 w-4" />
                      <span>Colors</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="mode"
                      className="flex items-center space-x-2"
                    >
                      <Monitor className="h-4 w-4" />
                      <span>Mode</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="colors" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Color Schemes</h3>
                      <Badge variant="secondary" className="text-xs">
                        {Object.keys(colorSchemes).length} available
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                      {Object.entries(colorSchemes).map(([key, scheme]) => (
                        <ThemePreview
                          key={key}
                          scheme={key as ColorScheme}
                          isActive={colorScheme === key}
                          onClick={() => {
                            /* onClick is now handled internally by ThemePreview */
                          }}
                        />
                      ))}
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        Current:{" "}
                        <span className="font-medium">
                          {colorSchemes[colorScheme as ColorScheme]?.name}
                        </span>
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="mode" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Display Mode</h3>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {theme}
                      </Badge>
                    </div>

                    <div className="grid gap-2">
                      {themeOptions.map((option) => {
                        const Icon = option.icon;
                        const isActive = theme === option.value;

                        return (
                          <motion.div
                            key={option.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant={isActive ? "default" : "outline"}
                              className="w-full justify-start h-12"
                              onClick={() => setTheme(option.value)}
                            >
                              <Icon className="h-4 w-4 mr-3" />
                              <span className="flex-1 text-left">
                                {option.label}
                              </span>
                              {isActive && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Badge
                                    variant="secondary"
                                    className={option.color}
                                  >
                                    Active
                                  </Badge>
                                </motion.div>
                              )}
                            </Button>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground text-center">
                        System mode follows your device settings
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
