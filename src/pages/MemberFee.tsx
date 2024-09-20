import Container from '@/ui/Container'

const MemberFee = () => {
  return (
    <Container>
      <div
        className='border-gray-400 bg-slate-200 w-96 border-solid relative flex flex-1 flex-col justify-center gap-5 rounded-xl border-b border-l border-r border-t px-6 pb-10 pt-6 text-sm'
        data-testid='free-pricing-modal-column'
      >
        <div className='bg-token-main-surface-primary relative flex flex-col'>
          <div className='flex flex-col gap-1'>
            <p className='flex items-center gap-2 text-2xl font-semibold'>Miễn phí</p>
            <div className='ml-4 mt-2 flex items-baseline gap-1.5'>
              <div className='relative'>
            </div>
            </div>
            <p className='text-token-text-primary mr-2 mt-2 text-base' data-testid='free-pricing-column-cost-subtitle'>
              Cùng khám phá sự hỗ trợ của AI trong các công việc hằng ngày của bạn
            </p>
          </div>
        </div>
        <div className='bg-token-main-surface-primary relative flex flex-col'>
          <button
            className='btn btn-secondary btn-large bg-token-sidebar-surface-tertiary text-token-text-secondary hover:bg-token-sidebar-surface-tertiary dark:bg-token-text-tertiary dark:text-token-text-secondary relative cursor-not-allowed border-none font-semibold opacity-50 hover:bg-inherit'
            
          >
            <div className='flex items-center justify-center'>Kế hoạch hiện tại của bạn</div>
          </button>
        </div>
        <div className='flex flex-grow flex-col gap-2'>
          <div className='bg-token-main-surface-primary relative'>
            <div className='text-l flex justify-start gap-2'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mt-0.5 h-4 w-4 shrink-0'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z'
                  fill='currentColor'
                ></path>
              </svg>
              <span>Hỗ trợ viết, giải quyết vấn đề và nhiều tính năng khác</span>
            </div>
          </div>
          <div className='bg-token-main-surface-primary relative'>
            <div className='text-l flex justify-start gap-2'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mt-0.5 h-4 w-4 shrink-0'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z'
                  fill='currentColor'
                ></path>
              </svg>
              <span>Truy cập vào GPT-4o mini</span>
            </div>
          </div>
          <div className='bg-token-main-surface-primary relative'>
            <div className='text-l flex justify-start gap-2'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mt-0.5 h-4 w-4 shrink-0'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z'
                  fill='currentColor'
                ></path>
              </svg>
              <span>Quyền truy cập hạn chế vào GPT‑4o</span>
            </div>
          </div>
          <div className='bg-token-main-surface-primary relative'>
            <div className='text-l flex justify-start gap-2'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mt-0.5 h-4 w-4 shrink-0'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z'
                  fill='currentColor'
                ></path>
              </svg>
              <span>Limited access to data analysis, file uploads, vision, web browsing, and image generation</span>
            </div>
          </div>
          <div className='bg-token-main-surface-primary relative'>
            <div className='text-l flex justify-start gap-2'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mt-0.5 h-4 w-4 shrink-0'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M18.0633 5.67387C18.5196 5.98499 18.6374 6.60712 18.3262 7.06343L10.8262 18.0634C10.6585 18.3095 10.3898 18.4679 10.0934 18.4957C9.79688 18.5235 9.50345 18.4178 9.29289 18.2072L4.79289 13.7072C4.40237 13.3167 4.40237 12.6835 4.79289 12.293C5.18342 11.9025 5.81658 11.9025 6.20711 12.293L9.85368 15.9396L16.6738 5.93676C16.9849 5.48045 17.607 5.36275 18.0633 5.67387Z'
                  fill='currentColor'
                ></path>
              </svg>
              <span>Sử dụng GPT tùy chỉnh</span>
            </div>
          </div>
        </div>
        <div className='text-token-text-secondary bg-token-main-surface-primary relative flex flex-col text-xs'>
          <div>
            Hiện tại bạn có kế hoạch rồi? Xem{' '}
            <a
              className='font-semibold underline'
              href='https://help.openai.com/en/collections/3943089-billing'
              target='_blank'
            >
              trợ giúp thanh toán
            </a>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default MemberFee
