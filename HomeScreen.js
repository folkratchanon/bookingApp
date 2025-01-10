import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMassage, setSelectedMassage] = useState({});
  const navigation = useNavigation();

  const handleBooking = (massageType, price) => {
    navigation.navigate("BookingScreen", { massageType, price });
  };

  const handleOpenModal = (massage) => {
    setSelectedMassage(massage);
    setModalVisible(true);
  };

  const massages = [
    {
      type: "นวดไทย",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Thaimassage.jpg",
      price: "200 บาท/1 ชั่วโมง",
      description: "การนวดไทยแบบดั้งเดิม ช่วยผ่อนคลายกล้ามเนื้อและเพิ่มความยืดหยุ่น",
    },
    {
      type: "นวดน้ำมันอโรมา",
      imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/10/cc/d8/44/90-mins-aroma-oil-massage.jpg",
      price: "250 บาท/1 ชั่วโมง",
      description: "นวดด้วยน้ำมันหอมระเหย ช่วยผ่อนคลายร่างกายและจิตใจ",
    },
    {
      type: "นวดเท้า",
      imageUrl: "https://medmassager.com/cdn/shop/articles/Foot_Massage_Benefits.png?v=1710955710&width=2048",
      price: "180 บาท/1 ชั่วโมง",
      description: "นวดกดจุดใต้ฝ่าเท้า ช่วยกระตุ้นการไหลเวียนเลือดและบำบัดอาการต่างๆ",
    },
    {
      type: "นวดคอบ่าไหล่",
      imageUrl: "https://www.tria.co.th/image_upload/PACKAGE-59_1.jpg",
      price: "220 บาท/1 ชั่วโมง",
      description: "นวดเน้นบริเวณคอ บ่า และไหล่ ช่วยลดอาการปวดเมื่อยจากการทำงาน",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#8B4513', '#D2691E']}
        style={styles.header}
      >
        <Text style={styles.headerText}>นวดเพื่อสุขภาพคุณนิ่ม</Text>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {massages.map((massage, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => handleOpenModal(massage)}>
            <Image source={{ uri: massage.imageUrl }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{massage.type}</Text>
              <Text style={styles.cardPrice}>{massage.price}</Text>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => handleBooking(massage.type, massage.price)}
              >
                <Text style={styles.bookButtonText}>จองคิว</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Image
              source={{ uri: selectedMassage.imageUrl }}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>{selectedMassage.type}</Text>
            <Text style={styles.modalPrice}>{selectedMassage.price}</Text>
            <Text style={styles.modalDescription}>
              {selectedMassage.description}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>ปิด</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC",
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF8DC',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#FFF8DC",
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8B4513",
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 16,
    color: "#D2691E",
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: "#8B4513",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: "#FFF8DC",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "#FFF8DC",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8B4513",
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 20,
    color: "#D2691E",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#8B4513",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#8B4513",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "#FFF8DC",
    fontSize: 16,
    fontWeight: "bold",
  },
});