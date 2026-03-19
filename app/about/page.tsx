export default function AboutPage() {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold">Về chúng tôi</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Câu chuyện của BanCay</h2>
          <p className="text-gray-600 leading-relaxed">
            BanCay được thành lập với mục đích mang cây cảnh chất lượng cao đến tay mọi người. 
            Chúng tôi tin rằng cây xanh không chỉ làm đẹp không gian mà còn giúp cải thiện sức khỏe 
            và tinh thần của con người.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Với hơn 10 năm kinh nghiệm trong ngành, chúng tôi cam kết cung cấp những sản phẩm 
            tốt nhất, dịch vụ chuyên nghiệp và tư vấn hoa chuyên sâu.
          </p>
        </div>
        <div className="bg-primary/10 p-8 rounded-lg">
          <img src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop" alt="BanCay" className="w-full rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">10+</div>
          <p className="text-gray-600">Năm kinh nghiệm</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">5000+</div>
          <p className="text-gray-600">Khách hàng hài lòng</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">2000+</div>
          <p className="text-gray-600">Loại cây có sẵn</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6">Giá trị của chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">Chất lượng</h3>
            <p className="text-gray-600">Tất cả sản phẩm được lựa chọn và kiểm định kỹ lưỡng</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Tư vấn</h3>
            <p className="text-gray-600">Đội tư vấn có kinh nghiệm sẵn sàng giúp bạn chọn cây phù hợp</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Dịch vụ</h3>
            <p className="text-gray-600">Giao hàng nhanh, hỗ trợ after-sales và bảo hành tốt</p>
          </div>
        </div>
      </div>
    </div>
  );
}
