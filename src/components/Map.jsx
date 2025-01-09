const Map = () => {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg flex-grow h-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.398973738911!2d4.3642118157494015!3d50.84832457953126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c4853e3d955b%3A0xddb57f1cbe1237e1!2sAvenue%20des%20Arts%203%2C%201210%20Saint-Josse-ten-Noode!5e0!3m2!1sen!2sbe!4v1632134567801!5m2!1sen!2sbe"
        style={{
          border: 0,
          width: '100%',
          height: '90%',
        }}
        allowFullScreen=""
        loading="lazy"
        title="Google Map"
        className="rounded-xl"
      ></iframe>
    </div>
  );
};

export default Map;
