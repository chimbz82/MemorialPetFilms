
/**
 * Memorial Video Template Configurations
 * 
 * All templates are respectful, minimal, and suitable for all pets.
 * Each template defines transition styles, timing, text placement, and music behaviour.
 */

export const TEMPLATES = {
  'forever-loved': {
    id: 'forever-loved',
    name: 'Forever Loved',
    description: 'Soft fades with centred opening text and balanced pacing for a timeless tribute',
    
    // Visual settings
    transition: {
      type: 'fade',
      duration: 1.5,
      easing: 'linear'
    },
    
    // Timing
    timing: {
      photoDuration: 4.5,
      titleCardDuration: 5.0,
      endCardDuration: 6.0
    },
    
    // Text styling
    text: {
      placement: 'center',
      titleSize: 96,
      subtitleSize: 48,
      messageSize: 42,
      fontFamily: 'Georgia',
      color: '#4A4A4A',
      shadow: 'subtle'
    },
    
    // Background
    background: {
      color: '#F5F1ED',
      overlay: 'none',
      vignette: false
    },
    
    // Music
    music: {
      fadeIn: 2.0,
      fadeOut: 3.0,
      volume: 0.3
    },
    
    // Effects
    effects: {
      zoom: false,
      kenBurns: false,
      colorGrading: 'neutral'
    }
  },

  'pawprints-hearts': {
    id: 'pawprints-hearts',
    name: 'Pawprints in Our Hearts',
    description: 'Gentle cross-dissolves with warm tones and bottom-third text for comfort',
    
    transition: {
      type: 'crossfade',
      duration: 2.0,
      easing: 'ease-in-out'
    },
    
    timing: {
      photoDuration: 5.0,
      titleCardDuration: 5.5,
      endCardDuration: 6.0
    },
    
    text: {
      placement: 'bottom-third',
      titleSize: 84,
      subtitleSize: 44,
      messageSize: 38,
      fontFamily: 'Georgia',
      color: '#5A4A3A',
      shadow: 'medium'
    },
    
    background: {
      color: '#F8F4F0',
      overlay: 'warm',
      vignette: true
    },
    
    music: {
      fadeIn: 2.5,
      fadeOut: 3.5,
      volume: 0.3
    },
    
    effects: {
      zoom: false,
      kenBurns: false,
      colorGrading: 'warm'
    }
  },

  'rainbow-bridge': {
    id: 'rainbow-bridge',
    name: 'Rainbow Bridge',
    description: 'Light glow transitions with subtle gradients and a heartfelt farewell message',
    
    transition: {
      type: 'fade',
      duration: 2.0,
      easing: 'ease-out',
      glow: true
    },
    
    timing: {
      photoDuration: 5.0,
      titleCardDuration: 6.0,
      endCardDuration: 7.0
    },
    
    text: {
      placement: 'center',
      titleSize: 92,
      subtitleSize: 46,
      messageSize: 40,
      fontFamily: 'Georgia',
      color: '#4A5A6A',
      shadow: 'soft'
    },
    
    background: {
      color: '#E8F4F8',
      overlay: 'gradient-soft',
      vignette: false
    },
    
    music: {
      fadeIn: 3.0,
      fadeOut: 4.0,
      volume: 0.28
    },
    
    effects: {
      zoom: false,
      kenBurns: false,
      colorGrading: 'cool-soft'
    }
  },

  'life-well-lived': {
    id: 'life-well-lived',
    name: 'A Life Well Lived',
    description: 'Chronological flow with clean slide transitions and story-driven pacing',
    
    transition: {
      type: 'smoothleft',
      duration: 1.8,
      easing: 'ease-in-out'
    },
    
    timing: {
      photoDuration: 4.8,
      titleCardDuration: 5.5,
      endCardDuration: 5.5
    },
    
    text: {
      placement: 'top-third',
      titleSize: 88,
      subtitleSize: 44,
      messageSize: 38,
      fontFamily: 'Georgia',
      color: '#3A3A3A',
      shadow: 'clean'
    },
    
    background: {
      color: '#F7F7F5',
      overlay: 'none',
      vignette: false
    },
    
    music: {
      fadeIn: 2.0,
      fadeOut: 3.0,
      volume: 0.32
    },
    
    effects: {
      zoom: false,
      kenBurns: false,
      colorGrading: 'neutral-bright'
    }
  },

  'gentle-goodbye': {
    id: 'gentle-goodbye',
    name: 'Gentle Goodbye',
    description: 'Slow fade to white transitions with minimal text for quiet reflection',
    
    transition: {
      type: 'fade',
      duration: 2.5,
      easing: 'ease-out',
      fadeToWhite: true
    },
    
    timing: {
      photoDuration: 6.0,
      titleCardDuration: 6.5,
      endCardDuration: 8.0
    },
    
    text: {
      placement: 'center',
      titleSize: 86,
      subtitleSize: 42,
      messageSize: 36,
      fontFamily: 'Georgia',
      color: '#5A5A5A',
      shadow: 'minimal'
    },
    
    background: {
      color: '#FAFAFA',
      overlay: 'soft-white',
      vignette: false
    },
    
    music: {
      fadeIn: 3.5,
      fadeOut: 5.0,
      volume: 0.25
    },
    
    effects: {
      zoom: false,
      kenBurns: false,
      colorGrading: 'soft-desaturate'
    }
  },

  'always-by-side': {
    id: 'always-by-side',
    name: 'Always by Your Side',
    description: 'Subtle Ken Burns effect with side-aligned text emphasising companionship',
    
    transition: {
      type: 'fade',
      duration: 1.8,
      easing: 'ease-in-out'
    },
    
    timing: {
      photoDuration: 5.5,
      titleCardDuration: 5.5,
      endCardDuration: 6.0
    },
    
    text: {
      placement: 'left-third',
      titleSize: 82,
      subtitleSize: 42,
      messageSize: 36,
      fontFamily: 'Georgia',
      color: '#4A4A4A',
      shadow: 'medium'
    },
    
    background: {
      color: '#F2F0ED',
      overlay: 'none',
      vignette: true
    },
    
    music: {
      fadeIn: 2.5,
      fadeOut: 3.5,
      volume: 0.3
    },
    
    effects: {
      zoom: true,
      kenBurns: true,
      kenBurnsIntensity: 'subtle', // 1.05x max zoom
      colorGrading: 'neutral-warm'
    }
  },

  'cherished-memories': {
    id: 'cherished-memories',
    name: 'Cherished Memories',
    description: 'Album-style presentation with consistent timing and simple title cards',
    
    transition: {
      type: 'fade',
      duration: 1.2,
      easing: 'linear'
    },
    
    timing: {
      photoDuration: 4.0,
      titleCardDuration: 5.0,
      endCardDuration: 5.5
    },
    
    text: {
      placement: 'center',
      titleSize: 90,
      subtitleSize: 46,
      messageSize: 40,
      fontFamily: 'Georgia',
      color: '#3A3A3A',
      shadow: 'clean'
    },
    
    background: {
      color: '#F5F3F0',
      overlay: 'none',
      vignette: false
    },
    
    music: {
      fadeIn: 2.0,
      fadeOut: 3.0,
      volume: 0.3
    },
    
    effects: {
      zoom: false,
      kenBurns: false,
      colorGrading: 'neutral'
    }
  },

  'until-meet-again': {
    id: 'until-meet-again',
    name: 'Until We Meet Again',
    description: 'Opening dedication and closing message for ceremonial sharing',
    
    transition: {
      type: 'fade',
      duration: 2.2,
      easing: 'ease-in-out'
    },
    
    timing: {
      photoDuration: 5.5,
      titleCardDuration: 7.0,
      endCardDuration: 8.0
    },
    
    text: {
      placement: 'center',
      titleSize: 94,
      subtitleSize: 48,
      messageSize: 42,
      fontFamily: 'Georgia',
      color: '#4A4A5A',
      shadow: 'soft'
    },
    
    background: {
      color: '#EEF2F5',
      overlay: 'soft-gradient',
      vignette: false
    },
    
    music: {
      fadeIn: 3.0,
      fadeOut: 4.5,
      volume: 0.28
    },
    
    effects: {
      zoom: false,
      kenBurns: false,
      colorGrading: 'cool-neutral'
    }
  },

  'peaceful-rest': {
    id: 'peaceful-rest',
    name: 'Peaceful Rest',
    description: 'Muted colours with longest durations and minimal motion for a quiet tribute',
    
    transition: {
      type: 'fade',
      duration: 3.0,
      easing: 'ease-out'
    },
    
    timing: {
      photoDuration: 7.0,
      titleCardDuration: 7.5,
      endCardDuration: 9.0
    },
    
    text: {
      placement: 'center',
      titleSize: 84,
      subtitleSize: 40,
      messageSize: 34,
      fontFamily: 'Georgia',
      color: '#6A6A6A',
      shadow: 'minimal'
    },
    
    background: {
      color: '#F0F0F0',
      overlay: 'muted',
      vignette: true
    },
    
    music: {
      fadeIn: 4.0,
      fadeOut: 6.0,
      volume: 0.22
    },
    
    effects: {
      zoom: false,
      kenBurns: false,
      colorGrading: 'desaturate-soft'
    }
  }
}

/**
 * Get template by ID
 */
export function getTemplate(templateId) {
  const template = TEMPLATES[templateId]
  if (!template) {
    throw new Error(`Template "${templateId}" not found`)
  }
  return template
}

/**
 * Get all template IDs
 */
export function getAllTemplateIds() {
  return Object.keys(TEMPLATES)
}

/**
 * Get templates for UI display
 */
export function getTemplatesForUI() {
  return Object.values(TEMPLATES).map(t => ({
    id: t.id,
    name: t.name,
    description: t.description
  }))
}

/**
 * Validate template ID
 */
export function isValidTemplate(templateId) {
  return templateId in TEMPLATES
}
