import { Calendar } from '@/components/calendar';
import EventForm from '@/components/calendar/Forms/EventForm';
import CustomModal from '@/components/ui/CustomModal/CustomModal';

const Home = () => {
  return (
    <div>
      <Calendar />
      <CustomModal
        open={true}
        onClose={() => {
          console.log('onClose called.');
        }}
      >
        <>
          <EventForm />
          <h1>
            1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nesciunt soluta possimus, expedita natus
            sed dolorum pariatur. Libero, tenetur enim. Doloribus blanditiis consequuntur animi repudiandae consequatur,
            sequi necessitatibus saepe ex eaque, obcaecati atque ut nesciunt ducimus quo nobis hic, voluptatibus eum
            similique quos commodi! Quibusdam eveniet officiis accusantium autem vero?
          </h1>
          <h1>======== ========== ======= ===========</h1>
          <h1>
            2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nesciunt soluta possimus, expedita natus
            sed dolorum pariatur. Libero, tenetur enim. Doloribus blanditiis consequuntur animi repudiandae consequatur,
            sequi necessitatibus saepe ex eaque, obcaecati atque ut nesciunt ducimus quo nobis hic, voluptatibus eum
            similique quos commodi! Quibusdam eveniet officiis accusantium autem vero?
          </h1>
        </>
      </CustomModal>
    </div>
  );
};

export default Home;
