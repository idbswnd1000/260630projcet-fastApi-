package com.example.demo.data;

import com.example.demo.channel.entity.Channel;
import com.example.demo.channel.repository.ChannelRepository;
import com.example.demo.customer.entity.Customer;
import com.example.demo.customer.entity.Region;
import com.example.demo.customer.repository.CustomerRepository;
import com.example.demo.customer.repository.RegionRepository;
import com.example.demo.product.entity.Category;
import com.example.demo.product.entity.Product;
import com.example.demo.product.entity.ProductCategory;
import com.example.demo.product.repository.CategoryRepository;
import com.example.demo.product.repository.ProductCategoryRepository;
import com.example.demo.product.repository.ProductRepository;
import com.example.demo.promotion.entity.Promotion;
import com.example.demo.promotion.repository.PromotionRepository;
import com.example.demo.sales.entity.Sale;
import com.example.demo.sales.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductRepository productRepository;

    private final RegionRepository regionRepository;
    private final CustomerRepository customerRepository;

    private final ChannelRepository channelRepository;
    private final PromotionRepository promotionRepository;

    private final SaleRepository saleRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (saleRepository.count() > 0) {
            System.out.println("이미 데이터가 존재합니다. DataLoader 실행 안 함.");
            return;
        }

        loadDetails();
        loadSales();

        System.out.println("전체 엑셀 데이터 저장 완료");
    }

    private void loadDetails() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/Details.xlsx");

        try (InputStream inputStream = resource.getInputStream();
             Workbook workbook = WorkbookFactory.create(inputStream)) {

            loadCategories(workbook.getSheet("분류"));
            loadProductCategories(workbook.getSheet("제품분류"));
            loadProducts(workbook.getSheet("제품"));

            loadRegions(workbook.getSheet("지역"));
            loadCustomers(workbook.getSheet("2018년도~2022년도 주문고객"));

            loadChannels(workbook.getSheet("채널"));
            loadPromotions(workbook.getSheet("프로모션"));
        }
    }

    private void loadCategories(Sheet sheet) {
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            Category category = new Category();
            category.setId(getInt(row, 0));
            category.setCategoryName(getString(row, 1));

            categoryRepository.save(category);
        }

        System.out.println("categories 저장 완료");
    }

    private void loadProductCategories(Sheet sheet) {
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            Integer categoryCode = getInt(row, 2);
            Category category = categoryRepository.findById(categoryCode)
                    .orElseThrow(() -> new RuntimeException("Category 없음: " + categoryCode));

            ProductCategory productCategory = new ProductCategory();
            productCategory.setId(getString(row, 0));
            productCategory.setProductCategoryName(getString(row, 1));
            productCategory.setCategory(category);

            productCategoryRepository.save(productCategory);
        }

        System.out.println("product_categories 저장 완료");
    }

    private void loadProducts(Sheet sheet) {
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            String productCategoryCode = getString(row, 5);
            ProductCategory productCategory = productCategoryRepository.findById(productCategoryCode)
                    .orElseThrow(() -> new RuntimeException("ProductCategory 없음: " + productCategoryCode));

            Product product = new Product();
            product.setId(getInt(row, 0));
            product.setProductName(getString(row, 1));
            product.setColor(getString(row, 2));
            product.setPrice(getInt(row, 3));
            product.setSalePrice(getInt(row, 4));
            product.setProductCategory(productCategory);

            productRepository.save(product);
        }

        System.out.println("products 저장 완료");
    }

    private void loadRegions(Sheet sheet) {
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            Region region = new Region();
            region.setId(getInt(row, 0));
            region.setProvince(getString(row, 1));
            region.setCityDistrict(getString(row, 2));
            region.setRegionName(getString(row, 3));

            regionRepository.save(region);
        }

        System.out.println("regions 저장 완료");
    }

    private void loadCustomers(Sheet sheet) {
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            Integer regionCode = getInt(row, 1);
            Region region = regionRepository.findById(regionCode)
                    .orElseThrow(() -> new RuntimeException("Region 없음: " + regionCode));

            Customer customer = new Customer();
            customer.setId(getInt(row, 0));
            customer.setRegion(region);
            customer.setCustomerName(getString(row, 2));
            customer.setGender(getString(row, 3));
            customer.setBirthDate(getLocalDate(row, 4));

            customerRepository.save(customer);
        }

        System.out.println("customers 저장 완료");
    }

    private void loadChannels(Sheet sheet) {
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            Channel channel = new Channel();
            channel.setId(getInt(row, 0));
            channel.setChannelName(getString(row, 1));

            channelRepository.save(channel);
        }

        System.out.println("channels 저장 완료");
    }

    private void loadPromotions(Sheet sheet) {
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            Promotion promotion = new Promotion();
            promotion.setId(getInt(row, 0));
            promotion.setPromotionName(getString(row, 1));
            promotion.setDiscountRate(getDouble(row, 2));

            promotionRepository.save(promotion);
        }

        System.out.println("promotions 저장 완료");
    }

    private void loadSales() throws Exception {
        ClassPathResource resource = new ClassPathResource("data/Sales.xlsx");

        try (InputStream inputStream = resource.getInputStream();
             Workbook workbook = WorkbookFactory.create(inputStream)) {

            Sheet sheet = workbook.getSheetAt(0);

            int saleId = 1;

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;

                Integer productCode = getInt(row, 1);
                Integer customerCode = getInt(row, 2);
                Integer promotionCode = getInt(row, 3);
                Integer channelCode = getInt(row, 4);

                Product product = productRepository.findById(productCode)
                        .orElseThrow(() -> new RuntimeException("Product 없음: " + productCode));

                Customer customer = customerRepository.findById(customerCode)
                        .orElseThrow(() -> new RuntimeException("Customer 없음: " + customerCode));

                Promotion promotion = promotionRepository.findById(promotionCode)
                        .orElseThrow(() -> new RuntimeException("Promotion 없음: " + promotionCode));

                Channel channel = channelRepository.findById(channelCode)
                        .orElseThrow(() -> new RuntimeException("Channel 없음: " + channelCode));

                Sale sale = new Sale();
                sale.setId(saleId++);
                sale.setDate(getLocalDate(row, 0));
                sale.setProduct(product);
                sale.setCustomer(customer);
                sale.setPromotion(promotion);
                sale.setChannel(channel);
                sale.setQuantity(getInt(row, 5));

                saleRepository.save(sale);
            }
        }

        System.out.println("sales 저장 완료");
    }

    private String getString(Row row, int index) {
        Cell cell = row.getCell(index);
        if (cell == null) return null;

        if (cell.getCellType() == CellType.STRING) {
            return cell.getStringCellValue().trim();
        }

        if (cell.getCellType() == CellType.NUMERIC) {
            return String.valueOf((int) cell.getNumericCellValue());
        }

        return cell.toString().trim();
    }

    private Integer getInt(Row row, int index) {
        Cell cell = row.getCell(index);
        if (cell == null) return null;

        if (cell.getCellType() == CellType.NUMERIC) {
            return (int) cell.getNumericCellValue();
        }

        if (cell.getCellType() == CellType.STRING) {
            return Integer.parseInt(cell.getStringCellValue().trim());
        }

        return null;
    }

    private Double getDouble(Row row, int index) {
        Cell cell = row.getCell(index);
        if (cell == null) return null;

        if (cell.getCellType() == CellType.NUMERIC) {
            return cell.getNumericCellValue();
        }

        if (cell.getCellType() == CellType.STRING) {
            return Double.parseDouble(cell.getStringCellValue().trim());
        }

        return null;
    }

    private LocalDate getLocalDate(Row row, int index) {
        Cell cell = row.getCell(index);
        if (cell == null) return null;

        switch (cell.getCellType()) {
            case NUMERIC:
                return cell.getLocalDateTimeCellValue().toLocalDate();

            case STRING:
                String value = cell.getStringCellValue().trim();

                value = value.replace("오전", "")
                        .replace("오후", "")
                        .trim();

                if (value.contains(" ")) {
                    value = value.substring(0, value.indexOf(" "));
                }

                value = value.replace(".", "-")
                        .replace("/", "-");

                return LocalDate.parse(value);

            default:
                return null;
        }
    }
}