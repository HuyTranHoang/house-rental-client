import { Button, ConfigProvider } from 'antd'

function ColorButton({
                       linkHover,
                       fontWeight,
                       borderHoverColor,
                       defaultHover,
                       borderColor,
                       defaultText,
                       lineWidth,
                       children,
                       ...props
                     }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            //Default
            fontWeight: fontWeight || undefined,
            colorDefaultText: defaultText || 'black',
            defaultBorderColor: borderColor || 'black',
            defaultHoverColor: defaultHover || 'black',
            defaultHoverBorderColor: borderHoverColor || 'black',
            //Text
            colorLink: 'black',
            colorLinkHover: linkHover || 'black',
            colorLinkActive: '#0499A8',
            linkFocusDecoration: 1,
            lineWidth: lineWidth || 2
          }
        }
      }}
    >
      <Button {...props}>{children}</Button>
    </ConfigProvider>
  )
}


export default ColorButton