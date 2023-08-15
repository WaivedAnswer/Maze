import React from 'react';

import dwarf from "../images/dwarf_right.png"
import orangePortal from "../images/orange-portal.png"
import yellowPortal from "../images/yellow-portal.png"
import greenPortal from "../images/green-portal.png"
import purplePortal from "../images/purple-portal.png"
import axe from "../images/axe2.png";
import sword from "../images/sword.png";
import bow from "../images/arrows2.png";
import potion from "../images/potion.png";
import exit from "../images/s1.png";

import barbarian from "../images/warrior2.png";
import elf from "../images/elf.png";
import mage from "../images/mage.png";
import connection from "../images/up.png";



const images = [ 
{path: dwarf, backgroundColor: "orange" },
{path: barbarian, backgroundColor: "yellow" },
{path: elf, backgroundColor: "green" },
{path: mage, backgroundColor: "purple" },

{path: connection, backgroundColor: "orange" },
{path: connection, backgroundColor: "yellow" },
{path: connection, backgroundColor: "green" },
{path: connection, backgroundColor: "purple" },

{path: orangePortal, backgroundColor: "orange" },
{path: yellowPortal, backgroundColor: "yellow" },
{path: greenPortal, backgroundColor: "green" },
{path: purplePortal, backgroundColor: "purple" },

{path: axe, backgroundColor: "orange" },
{path: sword, backgroundColor: "yellow" },
{path: bow, backgroundColor: "green" },
{path: potion, backgroundColor: "purple" },

{path: exit, backgroundColor: "orange" },
{path: exit, backgroundColor: "yellow" },
{path: exit, backgroundColor: "green" },
{path: exit, backgroundColor: "purple" },
]

const ImageGrid = () => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        gap: '10px'
      }}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px',
              padding: '16px',

              backgroundColor: image.backgroundColor
            }}
          >
            <img src={image.path} alt="grid" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </div>
        ))}
      </div>
);

export default ImageGrid;