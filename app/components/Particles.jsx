import React, {useState, useCallback, useEffect} from 'react';
import Particles from 'react-tsparticles';
import {loadFull} from 'tsparticles';

export const ParticlesContainer = React.memo(() => {
  const [loading, setLoading] = useState(true);

  const particlesInit = useCallback(async (particles) => {
    await loadFull(particles);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [loadFull]);
  if (loading) {
    return null; // Return null or a loading indicator while particles are loading
  }

  return (
    <Particles
      id="tsparticle"
      init={particlesInit}
      loaded={loading}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -999,
        },
        particles: {
          number: {
            value: 10,
            density: {
              enable: false,
              value_area: 500,
            },
          },
          color: {
            value: ['#0362c1', '#D4AF37'],
          },
          shape: {
            type: 'star',
            options: {
              sides: 50,
            },
          },
          opacity: {
            value: 1,
            random: false,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.9,
              sync: true,
            },
          },
          size: {
            value: 3,
            random: false,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.9,
              sync: false,
            },
          },
          rotate: {
            value: 0,
            random: true,
            direction: 'clockwise',
            animation: {
              enable: true,
              speed: 5,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: {
              value: ['#ffffffef'],
            },
            opacity: 0.5,
            width: 2,
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: ['grab'],
            },
            onclick: {
              enable: false,
              mode: 'bubble',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 200,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 6,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 100,
              duration: 2,
            },
          },
        },
        retina_detect: true,
        background: {
          color: '#111',
          image: '',
          position: '50% 50%',
          repeat: 'no-repeat',
          size: 'cover',
        },
      }}
    />
  );
})
