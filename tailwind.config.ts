
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Updated custom colors based on the brand identity
				charcoal: '#101010', // Very dark charcoal/almost black
				slate: '#1a1a1a', // Slightly lighter black for contrast
				'text-secondary': '#B0BEC5',
				'accent-red': '#ea384c', // Vibrant red accent color
				'savings-green': '#10B981', // Keep this for specific use cases
				'accent-blue': '#ea384c', // Replacing blue with red to maintain compatibility
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'card-select': {
					'0%': { transform: 'scale(1)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
					'100%': { transform: 'scale(1.05)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)' }
				},
				'button-hover': {
					'0%': { transform: 'translateY(0)', boxShadow: '0 4px 6px -1px rgba(234, 56, 76, 0.3)' },
					'100%': { transform: 'translateY(-2px)', boxShadow: '0 8px 15px -3px rgba(234, 56, 76, 0.4)' }
				},
				'red-glow': {
					'0%': { boxShadow: '0 0 5px rgba(234, 56, 76, 0.5)' },
					'50%': { boxShadow: '0 0 15px rgba(234, 56, 76, 0.7)' },
					'100%': { boxShadow: '0 0 5px rgba(234, 56, 76, 0.5)' }
				},
				'red-pulse': {
					'0%': { boxShadow: '0 0 5px rgba(234, 56, 76, 0.4)' },
					'50%': { boxShadow: '0 0 15px rgba(234, 56, 76, 0.7)' },
					'100%': { boxShadow: '0 0 5px rgba(234, 56, 76, 0.4)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'card-select': 'card-select 0.2s ease-out forwards',
				'button-hover': 'button-hover 0.2s ease-out',
				'red-glow': 'red-glow 2s ease-in-out infinite',
				'red-pulse': 'red-pulse 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
