"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Palette, Monitor, Moon, Sun } from "lucide-react";

export function ThemeSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();

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

  return (
    <div className="fixed bottom-20 right-8 z-50">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
          aria-label="Theme settings"
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
            className="absolute bottom-16 right-0 w-80"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="shadow-xl border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Theme Settings</CardTitle>
                </div>
                <CardDescription>
                  Choose your preferred color scheme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    Theme preference is saved locally
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
