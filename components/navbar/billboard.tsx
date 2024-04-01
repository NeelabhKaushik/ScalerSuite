const Billboard = () => {
  const gradientStyle = {
    backgroundImage:
      "linear-gradient(90deg, rgba(85,128,187,1) 20%, rgba(134,139,224,1) 100%)",
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        style={gradientStyle}
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            Hotel Suite&apos;s Powered by Scaler
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
