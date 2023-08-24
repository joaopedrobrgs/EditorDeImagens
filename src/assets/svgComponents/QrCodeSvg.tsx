type QrCodeSvgPropsType = {
  color?: string;
  size?: string;
};

export default function QrCodeSvg({
  color = "#686868",
  size = "4em",
}: QrCodeSvgPropsType) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: size,
        height: size,
        maxWidth: size,
        maxHeight: size,
      }}
    >
      <g clipPath="url(#clip0_12_166)">
        <path
          d="M4.38128 3.34618H3.34603V4.38142H4.38128V3.34618Z"
          fill={color}
        />
        <path
          d="M4.38128 7.36885H3.34603V8.4041H4.38128V7.36885Z"
          fill={color}
        />
        <path
          d="M2.51785 6.08219V6.54065V6.83644V9.23229H5.20949V7.78294H5.83063V8.44846V8.49283V9.20271H6.58488V8.58156H7.17644V9.20271H7.93069V8.49283H8.4779V9.20271H9.23215V8.44846H8.52227V7.73859H7.76802V8.44846H7.27252V6.98434H6.58488V6.36319H7.29475V7.07307H8.049V6.59982H8.4779V6.9104V7.30971V7.66465H9.23215V7.30971V6.9104V6.55546H8.7589V5.88994H9.23215V5.20963V5.13569V2.51799H6.5405V2.52295H5.83063V3.34618H5.20949V2.51799H2.51785V4.89905V5.20963V5.6533H2.99109V6.08219H2.51785V6.08219ZM4.73622 8.75904H2.99109V7.01392H4.73622V8.75904ZM5.87498 7.07307H6.51838V7.73859H5.87498V7.07307ZM5.87498 5.6533H6.4739V6.31882H5.87498V5.6533V5.6533ZM8.4779 5.84557H8.07112V5.60894H6.58486V5.20963H8.47788V5.84557H8.4779ZM7.01375 2.99124H8.75888V4.73636H7.01375V2.99124V2.99124ZM6.5405 4.89905H5.87498V3.42509H6.5405V4.89905ZM5.83063 5.60894H5.21138V4.94342H5.83063V5.60894ZM2.99109 2.99124H4.73622V4.73636H2.99109V2.99124ZM4.45713 5.20963V5.6533H5.12076V6.36317H5.83063V7.02869H5.20949V6.54065H3.27209V6.36317H3.70099H3.74536H4.45524V5.60892H3.74534H3.70097H3.27209V5.20961H4.45713V5.20963Z"
          fill={color}
        />
        <path
          d="M8.40396 3.34618H7.36871V4.38142H8.40396V3.34618Z"
          fill={color}
        />
      </g>
      <path
        d="M1 3V1.5C1 1.25 1.28571 1 1.57143 1C1.85714 1 3 1 3 1"
        stroke={color}
        strokeLinecap="round"
      />
      <path
        d="M10.7 3V1.5C10.7 1.25 10.4143 1 10.1286 1C9.84285 1 8.7 1 8.7 1"
        stroke={color}
        strokeLinecap="round"
      />
      <path
        d="M1 8.7V10.2C1 10.45 1.28571 10.7 1.57143 10.7C1.85714 10.7 3 10.7 3 10.7"
        stroke={color}
        strokeLinecap="round"
      />
      <path
        d="M10.7 8.7V10.2C10.7 10.45 10.4143 10.7 10.1286 10.7C9.84285 10.7 8.7 10.7 8.7 10.7"
        stroke={color}
        strokeLinecap="round"
      />
      <defs>
        <clipPath id="clip0_12_166">
          <rect
            width="6.7143"
            height="6.7143"
            fill="white"
            transform="translate(2.51785 2.51799)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
