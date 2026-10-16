export default function Icon({ name, size = 30, fill, className = "" }) {
  switch (name) {
    case "menu":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox={`0 0 200 200`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <g>
            <rect y="64.1" width="200" height="12" />
          </g>
          <g>
            <rect y="123.9" width="200" height="12" />
          </g>
        </svg>
      );
    case "close":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox={`0 0 200 200`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <rect
            x="94"
            y="0"
            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -41.4214 100)"
            width="12"
            height="200"
          />
          <rect
            x="0"
            y="94"
            transform="matrix(0.7071 -0.7071 0.7071 0.7071 -41.4214 100)"
            width="200"
            height="12"
          />
        </svg>
      );
    case "down":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox={`0 0 22 22`}
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <path d="M16.822 7.874a.608.608 0 0 1 0 .86l-5.37 5.37a.68.68 0 0 1-.962 0l-5.312-5.31a.608.608 0 0 1 .86-.861l4.933 4.932 4.99-4.99a.608.608 0 0 1 .86 0Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 97 97"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <path d="M64.4,16.1h9.1V0.7C71.9,0.5,66.5,0,60.2,0C47,0,38,8,38,22.8v13.6H23.5v17.2H38V97h17.8V53.6h13.9L72,36.4H55.8V24.5C55.8,19.5,57.2,16.1,64.4,16.1L64.4,16.1z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 60 60"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <g id="instagram">
            <path d="M41.2,0H18.8C8.4,0,0,8.4,0,18.8v22.5C0,51.6,8.4,60,18.8,60h22.5C51.6,60,60,51.6,60,41.2V18.8C60,8.4,51.6,0,41.2,0zM54.4,41.2c0,7.2-5.9,13.1-13.1,13.1H18.8c-7.2,0-13.1-5.9-13.1-13.1V18.8c0-7.2,5.9-13.1,13.1-13.1h22.5c7.2,0,13.1,5.9,13.1,13.1V41.2z" />
            <path d="M30,15c-8.3,0-15,6.7-15,15s6.7,15,15,15s15-6.7,15-15S38.3,15,30,15z M30,39.4c-5.2,0-9.4-4.2-9.4-9.4s4.2-9.4,9.4-9.4s9.4,4.2,9.4,9.4C39.4,35.2,35.2,39.4,30,39.4z" />
            <circle cx="46.1" cy="13.9" r="2" />
          </g>
        </svg>
      );
    case "linkedin":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <path d="M4.5,6.7v12.9H0.2V6.7H4.5z M4.8,2.7c0,0.6-0.2,1.2-0.7,1.6s-1,0.6-1.8,0.6h0c-0.7,0-1.3-0.2-1.7-0.6S0,3.3,0,2.7C0,2,0.2,1.5,0.7,1.1s1-0.6,1.8-0.6s1.3,0.2,1.7,0.6C4.6,1.5,4.8,2,4.8,2.7z M20,12.2v7.4h-4.3v-6.9c0-0.9-0.2-1.6-0.5-2.1c-0.4-0.5-0.9-0.8-1.6-0.8c-0.5,0-1,0.1-1.4,0.4c-0.4,0.3-0.6,0.7-0.8,1.1c-0.1,0.3-0.1,0.6-0.1,1.1v7.2H6.9c0-3.5,0-6.3,0-8.4s0-3.4,0-3.9l0-0.6h4.3v1.9h0c0.2-0.3,0.4-0.5,0.5-0.7c0.2-0.2,0.4-0.4,0.7-0.7s0.7-0.4,1.1-0.6c0.4-0.1,0.9-0.2,1.5-0.2c1.5,0,2.7,0.5,3.6,1.5C19.5,8.8,20,10.3,20,12.2z" />
        </svg>
      );
    case "quote":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 512 417"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <path d="M166.307 239.292H91.562v-20.564c0-89.735 48.584-136.471 130.803-143.95V0C82.219 3.739 0 93.474 0 226.206v190.686h166.307v-177.6Zm289.635 0h-74.745v-20.564c0-89.735 48.584-136.471 130.803-143.95V0C371.854 3.739 289.635 93.474 289.635 226.206v190.686h166.307v-177.6Z" />{" "}
        </svg>
      );
    case "shapeSingle":
      return (
        <svg
          className={className}
          viewBox="0 0 40.5 81"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <path d="M40.5,38.2V0C18.1,0,0,18.1,0,40.5S18.1,81,40.5,81V42.9" />
        </svg>
      );
    case "shapeDouble":
      return (
        <svg
          className={className}
          viewBox="0 0 1076 1080"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <path d="M538.248 508.351V.001C240.937 0 0 241.745 0 539.927s240.936 539.932 538.248 539.932v-508.21C554.548 855.153 788.815 1080 1075.52 1080V0C788.815 0 554.548 224.876 538.248 508.351Z" />
        </svg>
      );
    case "shapeStar":
      return (
        <svg
          className={className}
          viewBox="0 0 1076 1080"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <path d="M538.002 1080c0-298.231 240.766-540 537.758-540-296.992 0-537.758-241.769-537.758-540 0 298.231-240.767 540-537.76 540 296.993 0 537.76 241.769 537.76 540Z" />
        </svg>
      );
    case "star":
      return (
        <svg
          className={className}
          viewBox="0 0 143 143"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
          width={size}
          height={size}
        >
          <path
            d="M71.4986 57.5432L82.1951 4.03259L75.8173 58.201L102.501 10.6392L79.7069 60.203L119.804 23.1946L82.7957 63.2918L132.359 40.4976L84.7977 67.1814L138.966 60.8036L85.4555 71.5L138.966 82.1964L84.7977 75.8186L132.359 102.502L82.7957 79.7082L119.804 119.805L79.7069 82.797L102.501 132.361L75.8173 84.799L82.1951 138.967L71.4986 85.4568L60.8023 138.967L67.18 84.799L40.4963 132.361L63.2905 82.797L23.1933 119.805L60.2017 79.7082L10.6379 102.502L58.1996 75.8186L4.03125 82.1964L57.5419 71.5L4.03125 60.8036L58.1996 67.1814L10.6379 40.4976L60.2017 63.2918L23.1933 23.1946L63.2905 60.203L40.4963 10.6392L67.18 58.201L60.8023 4.03259L71.4986 57.5432Z"
            fill={fill}
          />
        </svg>
      );
    case "arrow":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <g>
            <polygon points="47.5,24 31.5,40.2 29.7,38.4 42.8,25.2 0.5,25.2 0.5,22.8 42.8,22.8 29.7,9.6 31.5,7.8" />
          </g>
        </svg>
      );

    case "lineHero":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 1512 10"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <path
            d="M-223.062 317.907C38.2795 146.333 389.2 -86.6953 823.089 32.7511C1069.77 100.66 1242.37 108.42 1365.84 96.1387C1490.11 83.7773 1565.41 51.6509 1630.11 31.9974L1664.99 146.818C1609.57 163.651 1517.3 201.665 1377.72 215.549C1237.33 229.514 1049.8 219.626 791.239 148.447C416.745 45.3515 110.823 242.258 -157.205 418.222L-223.062 317.907Z"
            fill={fill}
          />
        </svg>
      );
    case "shapeOrange":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 755 769"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M380.012 384.712C590.634 384.712 761.384 556.537 761.384 768.48V0.943811C761.384 212.893 590.634 384.712 380.012 384.712ZM0.622314 384.683C0.622314 596.953 170.424 769 379.862 769V0.423279C170.424 0.423279 0.622314 172.47 0.622314 384.683Z"
            fill="url(#paint0_linear_517_95)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_517_95"
              x1="516.167"
              y1="1082.98"
              x2="16.2994"
              y2="1082.98"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF6D91" />
              <stop offset="1" stopColor="#FF916E" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "download":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <path
            fill-rule="evenodd"
            d="m25.219 31.622 7.067-7.067L34 26.269l-9.992 9.992L14 26.269l1.713-1.715 7.082 7.07V8h2.424v23.622ZM38 40H10v-2h28v2Z"
            clip-rule="evenodd"
          />
        </svg>
      );
    case "home":
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 81 81.1"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <path d="M40.5,38.2V0C18.1,0,0,18.1,0,40.5S18.1,81,40.5,81V42.9C41.8,64.2,59.4,81.1,81,81.1V0C59.4,0,41.8,16.9,40.5,38.2z" />{" "}
        </svg>
      );
    default:
      return "⚠️";
  }
}
