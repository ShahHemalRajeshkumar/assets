import dynamic from 'next/dynamic';
import UserProfileSection from './UserProfileSection';
//import { table } from 'console';

const ContainerComponent = dynamic(() => import('./ContainerComponent'));
const LinkComponent = dynamic(() => import('./LinkComponent'));
const TextComponent = dynamic(() => import('./TextComponent'));
const HeaderTextComponent = dynamic(() => import('./HeaderTextComponent'));
const RichtextComponent = dynamic(() => import('./RichtextComponent'));
const ImageComponent = dynamic(() => import('./ImageComponent'));
const SwiperComponent = dynamic(() => import('./SwiperComponent'));
const DownloadComponent = dynamic(() => import('./DownloadComponent'));
const ButtonComponent = dynamic(() => import('./ButtonComponent'));
const InlineSvgComponent = dynamic(() => import('./InlineSvgComponent'));
const Swiper3Component = dynamic(() => import('./Swiper3Component'));
const SignupFormComponent = dynamic(() => import('./SignupFormComponent'));
const TabComponent = dynamic(() => import('./TabComponent'));
const AccordionComponent = dynamic(() => import('./AccordionComponent'));
const ScrollToComponent = dynamic(() => import('./ScrollToComponent'));
const CounterAnimationComponent = dynamic(() => import('./CounterAnimationComponent'));
const TextAdvanceComponent = dynamic(() => import('./TextAdvanceComponent'));
const MobileSwiperComponent = dynamic(() => import('./mobileSwiper'));
const SearchInstrumentComponent = dynamic(() => import('./SearchInstrumentComponent'));
const EmbedSocialReviewComponent = dynamic(() => import('./EmbedSocialReviewComponent'));
const StoryblokLink = dynamic(() => import('./StoryblokLink'));
const VideoComponent = dynamic(() => import('./VideoComponent'));
const YoutubeComponent = dynamic(() => import('./YoutubeComponent'));
const ShowMoreComponent = dynamic(() => import('./ShowMoreComponent'));
const PopUpComponent = dynamic(() => import('./PopUpComponent'));
const GoogleMapComponent = dynamic(() => import('./GoogleMapComponent'));
const BlogTeaser = dynamic(() => import('./BlogTeaser'));
const BlogList = dynamic(() => import('./BlogList'));
const NewsTeaser = dynamic(() => import('./NewsTeaser'));
const GiftVoucherFormComponent = dynamic(() => import('./GiftVoucherFormComponent'));
const IconComponent = dynamic(() => import('./IconComponent'));
const Logotype = dynamic(() => import('./Logotype'));
const BackgroundImageComponent = dynamic(() => import('./BackgroundImageComponent'));
const HighlightedSection = dynamic(() => import('./job/HighlightedSection'));
const InfoCardComponent = dynamic(() => import('./InfoCardComponent'));
const InfoCardWithIcon = dynamic(() => import('./InfoCardWithIcon'));
const InfoCardSection = dynamic(() => import('./InfoCardSection'));
const UserProfileCard = dynamic(() => import('./UserProfileCard'));
const TestimonialSection = dynamic(() => import('./TestimonialSection'));
const Testimonial = dynamic(() => import('./TestimonialCard'));
const ExpandableList = dynamic(() => import('./ExpandableList'));
const Text = dynamic(() => import('./storyblok/Text'));
const Banner = dynamic(()=> import('./storyblok/Banner'));
const Grid = dynamic(()=> import('./storyblok/Grid'));
const Card = dynamic(()=> import('./storyblok/Card'));
const Image = dynamic(()=> import('./storyblok/Image'));
const Button = dynamic(()=> import('./storyblok/Button'));
const CarouselItems = dynamic(()=> import('./storyblok/CarouselItems'));
const CarouselSlide = dynamic(()=> import('./storyblok/CarouselSlide'));
const CheckboxOptions = dynamic(()=> import('./storyblok/CheckboxOptions'));
const Checkbox = dynamic(()=> import('./storyblok/Checkbox'));
const Container = dynamic(()=> import('./storyblok/Container'));
const Input = dynamic(()=> import('./storyblok/Input'));
const RadioButtonOptions = dynamic(()=> import('./storyblok/RadioButtonOptions'));
const RadioButton = dynamic(()=> import('./storyblok/RadioButton'));
const Table = dynamic(()=> import('./storyblok/Table'));
const Testimonials = dynamic(()=> import('./storyblok/Testimonials'));
const TextArea = dynamic(()=> import('./storyblok/TextArea'));
const Video = dynamic(()=> import('./storyblok/Video'));
const Youtube = dynamic(()=> import('./storyblok/Youtube'));
const Features = dynamic(()=>import('./storyblok/Features'));
const Logos = dynamic(()=>import('./storyblok/Logos'));
const Infos = dynamic(()=>import(`./storyblok/Infos`));
const Banners = dynamic(()=>import('./storyblok/Banners'));
const RichText = dynamic(()=>import(`./storyblok/RichText`));
const AccordionView = dynamic(()=> import('./storyblok/AccordionView'));
const AccordionItems = dynamic(()=>import('./storyblok/AccordionItems'));
const GridItem = dynamic(()=>import('./storyblok/GridItem'));
const GoogleMap = dynamic(()=>import('./storyblok/GoogleMap'));
const GridCheck = dynamic(()=>import('./storyblok/Check'));
const ScrollTo = dynamic(()=>import('./storyblok/ScrollTo'));
const TableBodyTd = dynamic(()=>import('./storyblok/TableBodyTd'));
const TableBodyTr = dynamic(()=>import('./storyblok/TableBodyTr'));
const TableHeadHr = dynamic(()=>import('./storyblok/TableHeadHr'));
const Icon = dynamic(()=>import('./storyblok/Icon'));
const Form = dynamic(()=> import('./storyblok/Form'));
const FormInputs = dynamic(()=> import('./storyblok/FormInputs'));
const MaxLength = dynamic(()=> import('./storyblok/validators/MaxLength'));
const MinLength = dynamic(()=> import('./storyblok/validators/MinLength'));
const Numeric = dynamic(()=> import('./storyblok/validators/Numeric'));
const Required = dynamic(()=> import('./storyblok/validators/Required'));
const Email = dynamic(()=> import('./storyblok/validators/Email'));
const TextareaInput = dynamic(()=> import('./storyblok/TextareaInput'));
const Listings = dynamic(()=> import('./storyblok/Listings'));
const ListItems = dynamic(()=> import('./storyblok/ListItems'));
const HorizontalCard = dynamic(()=> import('./storyblok/HorizontalCard'));
const Forms = dynamic(()=> import('./storyblok/Forms'));
const Navigations = dynamic(()=> import('./storyblok/Navigations'));
const Accordions = dynamic(()=> import('./storyblok/Accordions'));
const StudentRecommendations = dynamic(()=> import('./storyblok/StudentRecommendations'));
const CanvaPresentation = dynamic(()=> import('./storyblok/CanvaPresentation'))



const Components = {
  'background-image-component': BackgroundImageComponent,
  'container-component': ContainerComponent,
  'link-component': LinkComponent,
  'header-text-component': HeaderTextComponent,
  'text-component': TextComponent,
  'rich-text-component': RichtextComponent,
  'image-component': ImageComponent,
  'swiper-component': SwiperComponent,
  'download-component': DownloadComponent,
  'button-component': ButtonComponent,
  'storyblok-link-component': StoryblokLink,
  'inline-svg-component': InlineSvgComponent,
  'swiper-3-component': Swiper3Component,
  'signup-form-component': SignupFormComponent,
  'tab-component': TabComponent,
  'accordion-component': AccordionComponent,
  'scroll-to-component': ScrollToComponent,
  'counter-animation-component': CounterAnimationComponent,
  'text-advance-component': TextAdvanceComponent,
  'mobile-swiper-component': MobileSwiperComponent,
  'search-instrument-component': SearchInstrumentComponent,
  'embed-social-review-component': EmbedSocialReviewComponent,
  'video-component': VideoComponent,
  'youtube-component': YoutubeComponent,
  'pop-up-component': PopUpComponent,
  'show-more-component': ShowMoreComponent,
  'google-map-component': GoogleMapComponent,
  'blog-teaser': BlogTeaser,
  'blog-list-component': BlogList,
  'news-teaser': NewsTeaser,
  'gift-voucher-form': GiftVoucherFormComponent,
  'icon-component': IconComponent,
  'highlighted-text-section': HighlightedSection,
  'info-card-component': InfoCardComponent,
  'info-card-with-icon': InfoCardWithIcon,
  'info-card-section': InfoCardSection,
  'user-profile-card': UserProfileCard,
  'user-profile-section': UserProfileSection,
  'testimonial-section': TestimonialSection,
  'testimonial-card': Testimonial,
  'expandable-list': ExpandableList,
  'accordionview': AccordionView,
  'text': Text,
  logotype: Logotype,
  'banner': Banner,
  'grid': Grid,
  'card': Card,
  'image': Image,
  'button': Button,
  'carousel_items': CarouselItems,
  'carousel_slide': CarouselSlide,
  'checkbox_options': CheckboxOptions,
  'checkbox': Checkbox,
  'container': Container,
  'card': Card,
  'radio_button_options': RadioButtonOptions,
  'radio_button': RadioButton,
  'table': Table,
  'testimonials': Testimonials,
  'text_area': TextArea,
  'video': Video,
  'youtube': Youtube,
  'features': Features,
  'logos': Logos,
  'banners': Banners,
  'infos': Infos,
  'richText': RichText,
  'accordionview': AccordionView,
  'accordion_item': AccordionItems,
  'grid_item':GridItem,
  'google_map': GoogleMap,
  'check': GridCheck,
  'scroll_to': ScrollTo,
  table_body_td: TableBodyTd,
  table_body_tr: TableBodyTr,
  table_head_hr: TableHeadHr,
  icon: Icon,
  required: Required,
  numeric: Numeric,
  max_length: MaxLength,
  min_length: MinLength,
  form: Form,
  form_inputs: FormInputs,
  email: Email,
  textarea_input: TextareaInput,
  listings: Listings,
  list_items: ListItems,
  horizontal_card: HorizontalCard,
  forms: Forms,
  navigations: Navigations,
  accordions: Accordions,
  students_recommendations: StudentRecommendations,
  canva_presentation: CanvaPresentation,

};

const DynamicComponent = ({ blok, title, instruments, slug, ...params }) => {
  if (blok && typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component];
    return <Component blok={blok} title={title} slug={slug} instruments={instruments} {...params} />;
  }
  return null;
};

export default DynamicComponent;
