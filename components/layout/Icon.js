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
          viewBox="0 0 512 512"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          focusable={false}
        >
          <path
            d="M67.12,164.54c14.89-23.4,49.99-56.37,99.97-85.09l7.45,10.63C117.1,135.82,97.96,209.21,117.1,212.4
	c26.6,2.13,53.19,10.63,74.46,30.85c43.6,43.6,43.6,112.74,1.06,157.41c-43.6,42.54-112.74,42.54-155.28,0
	C-29.67,333.64,29.89,216.64,67.12,164.54z M347.73,164.54c14.88-23.4,49.99-56.37,99.97-85.09l7.45,10.63
	c-57.43,45.74-76.57,119.12-57.43,122.31c26.59,2.13,53.17,10.63,74.44,30.85c43.61,43.6,43.61,112.74,1.07,157.41
	c-43.61,42.54-112.74,42.54-155.29,0C250.94,333.64,310.5,216.64,347.73,164.54z"
          />
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
          <path d="M33.625 25.205H10v-2.424h23.622l-7.067-7.067L28.269 14l9.992 9.992L28.27 34l-1.716-1.713 7.071-7.082Z" />
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
    default:
      return "⚠️";
  }
}
